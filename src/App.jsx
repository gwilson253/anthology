import React, { useState } from 'react';
import AlbumGrid from './components/AlbumGrid';
import AlbumDetail from './components/AlbumDetail';
import { MOCK_ALBUMS } from './mockData';

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

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
        />
      )}

      {/* Floating Audio Player (Future Implementation) */}
      <div className="mini-player-placeholder minimal-glass">
        <div className="player-content">
          <p>Select a track to start listening</p>
        </div>
      </div>

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

        .mini-player-placeholder {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 600px;
          height: 80px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          opacity: 0.8;
        }

        .player-content p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}

export default App;
