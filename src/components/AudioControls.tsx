import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioControlsProps {
  purimMode: boolean;
}

export const AudioControls = ({ purimMode }: AudioControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // IMPORTANT: Drop your own music.mp3 file in the /public folder
  // Do NOT use copyrighted music without permission
  const audioSrc = '/music.mp3';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current && purimMode) {
      const maxVolume = 0.8;
      if (volume > maxVolume) {
        setVolume(maxVolume);
      }
    }
  }, [purimMode, volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error('Audio playback failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="audio-controls">
      <audio ref={audioRef} src={audioSrc} loop />

      <motion.button
        className="audio-button play-button"
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '⏸️' : '▶️'} {isPlaying ? 'Pause' : 'Start Music'}
      </motion.button>

      <div className="volume-controls">
        <motion.button
          className="audio-button mute-button"
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🔊'}
        </motion.button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};
