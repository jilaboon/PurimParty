import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutoPlayMusicProps {
  purimMode: boolean;
}

export const AutoPlayMusic = ({ purimMode }: AutoPlayMusicProps) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showHint, setShowHint] = useState(true);
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

  // Set up one-time event listeners for starting music
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasAttemptedPlay.current) return;

    const startMusic = async () => {
      if (hasAttemptedPlay.current) return;
      hasAttemptedPlay.current = true;

      try {
        console.log('Attempting to play music...');
        await audio.play();
        console.log('Music started successfully!');
        setHasStarted(true);
        setShowHint(false);
      } catch (err) {
        console.error('Audio playback failed:', err);
        // Show error in hint
        setShowHint(false);
        // Try again after a short delay
        setTimeout(() => {
          if (audio && !hasStarted) {
            audio.play().catch((e) => console.error('Retry failed:', e));
          }
        }, 500);
      }
    };

    // Listen for ANY user interaction
    const events = ['click', 'touchstart', 'mousedown', 'keydown'];
    events.forEach((event) => {
      document.addEventListener(event, startMusic, { once: true, passive: true });
    });

    // Cleanup only when component unmounts
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, startMusic);
      });
    };
  }, []); // Empty deps - only run once on mount

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
          >
            <motion.div
              className="music-hint"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap anywhere to start music 🎶
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
