import React from 'react';

const AlbumGrid = ({ albums, onSelectAlbum }) => {
    return (
        <div className="album-grid">
            {albums.map((album) => (
                <div
                    key={album.id}
                    className="album-card"
                    onClick={() => onSelectAlbum(album)}
                >
                    <div className="album-artwork-container">
                        <img src={album.cover} alt={album.title} className="album-artwork" loading="lazy" />
                        <div className="album-overlay" />
                    </div>
                    <div className="album-info">
                        <h3>{album.title}</h3>
                        <p>{album.artist}</p>
                    </div>
                </div>
            ))}

            <style jsx="true">{`
        .album-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2rem;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .album-card {
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .album-card:hover {
          transform: translateY(-8px);
        }

        .album-artwork-container {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          background: #1a1a1a;
        }

        .album-artwork {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .album-card:hover .album-artwork {
          transform: scale(1.05);
        }

        .album-info {
          margin-top: 1rem;
        }

        .album-info h3 {
          margin: 0;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .album-info p {
          margin: 4px 0 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
};

export default AlbumGrid;
