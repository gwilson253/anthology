import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const Player = ({ track, isPlaying, onPlayPause, onNext, onPrev }) => {
    const audioRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (track && audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log('Playback error:', e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, track]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setProgress((current / total) * 100);
            if (total !== duration) {
                setDuration(total);
            }
        }
    };

    const handleSeek = (e) => {
        const width = e.target.closest('.progress-bar-container').clientWidth;
        const clickX = e.nativeEvent.offsetX;
        const newTime = (clickX / width) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    const formatTime = (time) => {
        if (!time) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (!track) return null;

    return (
        <div className="player-container minimal-glass">
            <audio
                ref={audioRef}
                src={track.url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={onNext}
            />

            <div className="player-content">
                <div className="track-info">
                    <div className="track-title">{track.title}</div>
                    <div className="track-artist">{track.artist || 'Unknown Artist'}</div>
                </div>

                <div className="controls-center">
                    <div className="playback-buttons">
                        <button className="control-btn secondary" onClick={onPrev}>
                            <SkipBack size={20} />
                        </button>
                        <button className="control-btn primary" onClick={onPlayPause}>
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                        </button>
                        <button className="control-btn secondary" onClick={onNext}>
                            <SkipForward size={20} />
                        </button>
                    </div>

                    <div className="progress-section">
                        <span className="time">{formatTime(audioRef.current?.currentTime)}</span>
                        <div className="progress-bar-container" onClick={handleSeek}>
                            <div className="progress-bar" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="time">{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="volume-controls">
                    <Volume2 size={20} />
                    <div className="volume-bar-track">
                        <div className="volume-bar" style={{ width: '80%' }} />
                    </div>
                </div>
            </div>

            <style jsx="true">{`
        .player-container {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 900px;
          height: 90px;
          border-radius: 20px;
          padding: 0 2rem;
          z-index: 1000;
          display: flex;
          align-items: center;
          animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .player-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 2rem;
        }

        .track-info {
          flex: 1;
          min-width: 0;
        }

        .track-title {
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-artist {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .controls-center {
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .playback-buttons {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .control-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, color 0.2s;
        }

        .control-btn:hover {
          color: white;
          transform: scale(1.1);
        }

        .control-btn.primary {
          width: 40px;
          height: 40px;
          background: white;
          color: black;
          border-radius: 50%;
        }
        
        .control-btn.primary:hover {
          background: #f0f0f0;
          color: black;
        }

        .progress-section {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .time {
          font-size: 0.75rem;
          color: var(--text-secondary);
          width: 35px;
        }

        .progress-bar-container {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          background: var(--text-primary);
          border-radius: 10px;
        }

        .volume-controls {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
        }

        .volume-bar-track {
          width: 80px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .volume-bar {
          height: 100%;
          background: var(--text-secondary);
          border-radius: 10px;
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default Player;
