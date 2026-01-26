import React, { useState } from 'react';
import AlbumGrid from './components/AlbumGrid';
import AlbumDetail from './components/AlbumDetail';
import Player from './components/Player';
import Footer from './components/Footer';
import { supabase } from './supabaseClient';
import { Vibrant } from 'node-vibrant/browser';

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeColors, setHomeColors] = useState(null);

  React.useEffect(() => {
    getAlbums();
  }, []);

  React.useEffect(() => {
    if (albums.length > 0 && albums[0].cover) {
      // Use a smaller version for palette extraction to speed it up and reduce bandwidth
      // Supabase storage doesn't support built-in resizing params on public URLs by default without an addon, 
      // but we'll use the raw URL. If CORS fails, we handle it gracefully.
      const v = new Vibrant(albums[0].cover);
      v.getPalette()
        .then((palette) => {
          setHomeColors({
            vibrant: palette.Vibrant?.hex,
            darkVibrant: palette.DarkVibrant?.hex,
            muted: palette.Muted?.hex,
          });
        })
        .catch(() => {
          // Silently fail or warn if CORS prevents extraction on localhost
          console.warn("Could not extract colors from cover image (likely CORS restriction). Using default theme.");
        });
    }
  }, [albums]);

  async function getAlbums() {
    try {
      setLoading(true);
      // Fetch albums
      const { data: albumsData, error: albumsError } = await supabase
        .from('albums')
        .select('*')
        .order('display_order', { ascending: true });

      if (albumsError) throw albumsError;

      // Fetch tracks for all albums
      const { data: tracksData, error: tracksError } = await supabase
        .from('tracks')
        .select('*');

      if (tracksError) throw tracksError;

      // Combine them
      // Combine them
      const fullAlbums = albumsData.map(album => ({
        ...album,
        // map database column names to our app's expected props if needed
        cover: album.cover_url,
        description: album.description,
        tracks: tracksData
          .filter(t => t.album_id === album.id)
          .sort((a, b) => a.track_number - b.track_number)
          .map(t => ({
            id: t.id,
            title: t.title,
            duration: t.duration,
            url: t.file_url,
            description: t.description
          }))
      }));

      setAlbums(fullAlbums);
    } catch (error) {
      console.error('Error loading music:', error);
    } finally {
      setLoading(false);
    }
  }

  const findTrackLocation = (trackId) => {
    for (let i = 0; i < albums.length; i++) {
      const album = albums[i];
      const trackIndex = album.tracks.findIndex(t => t.id === trackId);
      if (trackIndex !== -1) {
        return { albumIndex: i, trackIndex, album };
      }
    }
    return null;
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const loc = findTrackLocation(currentTrack.id);
    if (!loc) return;

    const { albumIndex, trackIndex, album } = loc;

    // Check if next track exists in current album
    if (trackIndex < album.tracks.length - 1) {
      handlePlayTrack(album.tracks[trackIndex + 1], album.artist);
    }
    // Check if next album exists
    else if (albumIndex < albums.length - 1) {
      const nextAlbum = albums[albumIndex + 1];
      if (nextAlbum.tracks.length > 0) {
        handlePlayTrack(nextAlbum.tracks[0], nextAlbum.artist);
      }
    }
    // Wrap to first album
    else if (albums.length > 0 && albums[0].tracks.length > 0) {
      const firstAlbum = albums[0];
      handlePlayTrack(firstAlbum.tracks[0], firstAlbum.artist);
    }
  };

  const handlePrev = () => {
    if (!currentTrack) return;
    const loc = findTrackLocation(currentTrack.id);
    if (!loc) return;

    const { albumIndex, trackIndex, album } = loc;

    // Check if prev track exists in current album
    if (trackIndex > 0) {
      handlePlayTrack(album.tracks[trackIndex - 1], album.artist);
    }
    // Check if prev album exists
    else if (albumIndex > 0) {
      const prevAlbum = albums[albumIndex - 1];
      if (prevAlbum.tracks.length > 0) {
        handlePlayTrack(prevAlbum.tracks[prevAlbum.tracks.length - 1], prevAlbum.artist);
      }
    }
    // Wrap to last album
    else if (albums.length > 0) {
      const lastAlbum = albums[albums.length - 1];
      if (lastAlbum.tracks.length > 0) {
        handlePlayTrack(lastAlbum.tracks[lastAlbum.tracks.length - 1], lastAlbum.artist);
      }
    }
  };

  const handlePlayTrack = (track, artist) => {
    setCurrentTrack({ ...track, artist });
    setIsPlaying(true);
  };

  const handlePlayAlbum = (album) => {
    if (album.tracks.length > 0) {
      handlePlayTrack(album.tracks[0], album.artist);
    }
  };

  const homeStyles = homeColors ? {
    background: `linear-gradient(180deg, ${homeColors.darkVibrant || '#1a1a1a'} 0%, #0a0a0a 100%)`,
    transition: 'background 1.5s ease'
  } : {};

  return (
    <div className="app-container">
      {!selectedAlbum ? (
        <main className="grid-view" style={homeStyles}>
          <header className="main-header">
            <div className="header-content">
              <h1>Greg Wilson | Albums</h1>
              <p>Albums and collections for your enjoyment.</p>
            </div>
          </header>
          <AlbumGrid
            albums={albums}
            onSelectAlbum={(album) => setSelectedAlbum(album)}
          />
          <Footer />
        </main>
      ) : (
        <AlbumDetail
          album={selectedAlbum}
          onBack={() => setSelectedAlbum(null)}
          onPlayTrack={(track) => handlePlayTrack(track, selectedAlbum.artist)}
          onPlayAlbum={() => handlePlayAlbum(selectedAlbum)}
        />
      )}

      <Player
        track={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <style jsx="true">{`
        .app-container {
          width: 100%;
          min-height: 100vh;
          background: #0a0a0a;
        }

        .main-header {
          padding: 6rem 2rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-content h1 {
          font-size: 3.5rem;
          margin: 0;
          background: linear-gradient(to right, #fff, rgba(255,255,255,0.4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-content p {
          color: var(--text-secondary);
          font-size: 1.2rem;
          margin: 0.5rem 0 0;
        }

      `}</style>
    </div>
  );
}

export default App;
