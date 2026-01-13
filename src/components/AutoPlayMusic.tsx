import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutoPlayMusicProps {
  purimMode: boolean;
}

export const AutoPlayMusic = ({ purimMode }: AutoPlayMusicProps) => {
  const [showHint, setShowHint] = useState(true);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasAttemptedPlay = useRef(false);

  // IMPORTANT: Replace /public/music.mp3 with your own music file
  // Do NOT use copyrighted music without permission
  const audioSrc = '/music.mp3';

  // Handle volume changes when purimMode changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const maxVolume = purimMode ? 0.8 : 0.6;
    audio.volume = maxVolume;
  }, [purimMode]);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || hasAttemptedPlay.current) return;

    audio.load();

    try {
      audio.currentTime = 0;
      await audio.play();
      hasAttemptedPlay.current = true;
      setShowHint(false);
      setPlaybackError(null);
    } catch (err) {
      console.error('Audio playback failed:', err);
      setPlaybackError('Tap again to start music.');
    }
  }, []);

  // Set up event listeners for starting music
  useEffect(() => {
    const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown'];
    events.forEach((event) => {
      document.addEventListener(event, startMusic, { passive: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, startMusic);
      });
    };
  }, [startMusic]);

  // Handle audio errors
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      const audioElement = e.target as HTMLAudioElement;
      if (audioElement.error) {
        console.error('Error code:', audioElement.error.code);
        console.error('Error message:', audioElement.error.message);
      }
    };

    const handleCanPlay = () => {
      console.log('Audio file loaded and can play');
    };

    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />

      <AnimatePresence>
        {showHint && (
          <motion.div
            className="music-hint-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onPointerDown={startMusic}
            onClick={startMusic}
          >
            <motion.div
              className="music-hint"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap anywhere to start music 🎶
              {playbackError && <div className="music-hint-error">{playbackError}</div>}
              <button
                type="button"
                className="music-hint-button"
                onClick={(e) => {
                  e.stopPropagation();
                  startMusic();
                }}
              >
                Start music
              </button>
              <button
                type="button"
                className="music-hint-skip"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHint(false);
                }}
              >
                Continue without music
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
