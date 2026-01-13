import { useEffect, useRef } from 'react';

interface NeonBackgroundProps {
  intensity: number;
  purimMode: boolean;
}

export const NeonBackground = ({ intensity, purimMode }: NeonBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      emoji?: string;
    }> = [];

    const emojis = ['🎭', '🍬', '🥳', '✨', '🎪', '🎉', '🪩'];
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0080', '#00ff00'];

    // Create particles
    const particleCount = purimMode ? 50 : 30;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (purimMode ? 3 : 1.5),
        vy: (Math.random() - 0.5) * (purimMode ? 3 : 1.5),
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: Math.random() > 0.7 ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
      });
    }

    let animationId: number;
    let hue = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      hue += 0.5;

      particles.forEach((p) => {
        p.x += p.vx * intensity;
        p.y += p.vy * intensity;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (p.emoji) {
          ctx.font = `${p.size * 8}px Arial`;
          ctx.fillText(p.emoji, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, purimMode]);

  return <canvas ref={canvasRef} className="neon-background" />;
};
