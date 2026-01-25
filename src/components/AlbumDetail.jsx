import React, { useEffect, useState } from 'react';
import { Vibrant } from 'node-vibrant/browser';
import { ChevronLeft, Play } from 'lucide-react';

const AlbumDetail = ({ album, onBack, onPlayTrack, onPlayAlbum }) => {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    if (album.cover) {
      const v = new Vibrant(album.cover);
      v.getPalette()
        .then((palette) => {
          setColors({
            vibrant: palette.Vibrant?.hex,
            darkVibrant: palette.DarkVibrant?.hex,
            muted: palette.Muted?.hex,
          });
        });
    }
  }, [album]);

  const dynamicStyles = colors ? {
    '--accent-color': colors.vibrant,
    '--accent-muted': colors.darkVibrant + '44', // add transparency
    '--bg-color': colors.darkVibrant || '#0a0a0a'
  } : {};

  return (
    <div className="album-detail-view" style={dynamicStyles}>
      <header className="detail-header">
        <button className="back-button" onClick={onBack}>
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>
      </header>

      <div className="detail-content">
        <div className="detail-artwork">
          <img src={album.cover} alt={album.title} />
        </div>

        <div className="detail-info">
          <p className="artist-label">{album.artist}</p>
          <h1>{album.title}</h1>

          <div className="action-row">
            <button className="play-button" onClick={onPlayAlbum}>
              <Play size={20} fill="currentColor" />
              <span>Play Album</span>
            </button>
          </div>

          <div className="track-list">
            {album.tracks.map((track, index) => (
              <div key={track.id} className="track-item" onClick={() => onPlayTrack(track)}>
                <span className="track-index">{index + 1}</span>
                <span className="track-title">{track.title}</span>
                <span className="track-duration">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .album-detail-view {
          min-height: 100vh;
          width: 100%;
          padding: 2rem;
          background: linear-gradient(180deg, var(--bg-color) 0%, #0a0a0a 100%);
          transition: background 1.5s ease;
          display: flex;
          flex-direction: column;
        }

        .back-button {
          background: transparent;
          border: none;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 8px 0;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .back-button:hover {
          opacity: 1;
        }

        .detail-content {
          display: flex;
          gap: 4rem;
          margin-top: 4rem;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          animation: slideUp 0.6s ease-out;
        }

        .detail-artwork {
          flex: 0 0 400px;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .detail-artwork img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-info {
          flex: 1;
        }

        .artist-label {
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.8rem;
          font-weight: 700;
          margin: 0;
        }

        h1 {
          font-size: 4rem;
          margin: 0.5rem 0 2rem;
          line-height: 1.1;
        }

        .play-button {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }

        .play-button:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .track-list {
          margin-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .track-item {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          gap: 1.5rem;
          opacity: 0.8;
          transition: opacity 0.2s, background 0.2s;
          cursor: pointer;
          padding-left: 1rem;
          border-radius: 8px;
        }

        .track-item:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.05);
        }

        .track-index {
          color: var(--text-secondary);
          width: 20px;
          font-size: 0.9rem;
        }

        .track-title {
          flex: 1;
          font-weight: 500;
        }

        .track-duration {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .detail-content {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
          .detail-artwork {
            flex: 0 0 300px;
            width: 300px;
          }
          h1 {
            font-size: 2.5rem;
            text-align: center;
          }
          .detail-info {
            width: 100%;
          }
          .artist-label {
            text-align: center;
          }
          .action-row {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AlbumDetail;
