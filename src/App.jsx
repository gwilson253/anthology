import React, { useState } from 'react';
import AlbumGrid from './components/AlbumGrid';
import AlbumDetail from './components/AlbumDetail';
import Player from './components/Player';
import { MOCK_ALBUMS } from './mockData';

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTrack = (track, artist) => {
    setCurrentTrack({ ...track, artist });
    setIsPlaying(true);
  };

  const handlePlayAlbum = (album) => {
    if (album.tracks.length > 0) {
      handlePlayTrack(album.tracks[0], album.artist);
    }
  };

  return (
    <div className="app-container">
      {!selectedAlbum ? (
        <main className="grid-view">
          <header className="main-header">
            <div className="header-content">
              <h1>Music Library</h1>
              <p>Explore your collection in style.</p>
            </div>
          </header>
          <AlbumGrid
            albums={MOCK_ALBUMS}
            onSelectAlbum={(album) => setSelectedAlbum(album)}
          />
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
        onNext={() => console.log('Next track')}
        onPrev={() => console.log('Prev track')}
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
