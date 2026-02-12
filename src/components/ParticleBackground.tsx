import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  theme: "red" | "dark";
  direction: "ltr" | "rtl";
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  type: "wave" | "ambient";
  waveIndex: number;
  phaseOffset: number;
  glowSize: number;
}

const WAVE_LINES = 7;
const CONNECTION_DIST = 135;
const WAVE_CYCLE = 7;
const PARTICLES_PER_900PX = 70;

const ParticleBackground = ({ theme, direction }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    const timeDir = direction === "rtl" ? 1 : -1;

    const isRed = theme === "red";
    const waveBaseAlpha = isRed ? 0.32 : 0.25;
    const waveAlphaRange = isRed ? 0.18 : 0.25;
    const connMaxAlpha = isRed ? 0.15 : 0.12;
    const particleFill = isRed ? "#ff0000" : "rgba(0,0,0,0.7)";
    const particleGlow = isRed ? "#ff0000" : "rgba(0,0,0,0.5)";
    const vigInner = isRed ? "rgba(40,0,0,0.08)" : "rgba(0,0,0,0.03)";
    const vigOuter = isRed ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.15)";

    const waveColor = (progress: number, alpha: number) =>
      isRed
        ? `rgba(${Math.floor(150 + progress * 105)},0,0,${alpha})`
        : `rgba(0,0,0,${alpha})`;

    const connColor = (alpha: number) =>
      isRed ? `rgba(255,0,0,${alpha})` : `rgba(0,0,0,${alpha})`;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const count = Math.max(40, Math.round((h / 900) * PARTICLES_PER_900PX));
      particles = [];
      for (let i = 0; i < count; i++) {
        const isWave = i < count * 0.6;
        particles.push({
          x: Math.random() * w,
          y: isWave ? h * 0.35 + Math.random() * h * 0.3 : Math.random() * h,
          radius: 1.5 + Math.random() * 2.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          type: isWave ? "wave" : "ambient",
          waveIndex: Math.floor(Math.random() * WAVE_LINES),
          phaseOffset: Math.random() * Math.PI * 2,
          glowSize: 8 + Math.random() * 7,
        });
      }
    };

    const getWaveY = (x: number, time: number, lineIndex: number) => {
      const centerY = h * 0.5;
      const bandHeight = h * 0.15;
      const lineOffset =
        ((lineIndex - (WAVE_LINES - 1) / 2) / WAVE_LINES) * bandHeight * 2;
      const freq = 0.002 + lineIndex * 0.0003;
      const amp = bandHeight * (0.6 + lineIndex * 0.06);
      const phase = lineIndex * 0.4;
      const t = time * timeDir;
      return (
        centerY +
        lineOffset +
        Math.sin(x * freq + t + phase) * amp * 0.5 +
        Math.sin(x * freq * 1.8 + t * 0.7 + phase * 1.3) * amp * 0.3
      );
    };

    const drawWaves = (time: number) => {
      for (let i = 0; i < WAVE_LINES; i++) {
        const progress = i / (WAVE_LINES - 1);
        const alpha = waveBaseAlpha + progress * waveAlphaRange;
        ctx.beginPath();
        ctx.strokeStyle = waveColor(progress, alpha);
        ctx.lineWidth = 1.5 + progress * 0.5;
        for (let x = 0; x <= w; x += 3) {
          const y = getWaveY(x, time, i);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const drawVignette = () => {
      const r = Math.max(w, h) * 0.75;
      const gradient = ctx.createRadialGradient(
        w * 0.5, h * 0.5, w * 0.1,
        w * 0.5, h * 0.5, r
      );
      gradient.addColorStop(0, vigInner);
      gradient.addColorStop(1, vigOuter);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = connMaxAlpha * (1 - dist / CONNECTION_DIST);
            ctx.beginPath();
            ctx.strokeStyle = connColor(alpha);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      ctx.save();
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleFill;
        ctx.shadowColor = particleGlow;
        ctx.shadowBlur = p.glowSize;
        ctx.fill();
      }
      ctx.restore();
    };

    const updateParticles = (time: number) => {
      for (const p of particles) {
        if (p.type === "wave") {
          const targetY =
            getWaveY(p.x, time, p.waveIndex) +
            Math.sin(time * 0.5 + p.phaseOffset) * 20;
          p.y += (targetY - p.y) * 0.008;
          p.x += p.vx;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        } else {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
          p.vx *= 0.99;
          p.vy *= 0.99;
          const maxV = 0.25;
          p.vx = Math.max(-maxV, Math.min(maxV, p.vx));
          p.vy = Math.max(-maxV, Math.min(maxV, p.vy));
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }
      }
    };

    const render = () => {
      if (!visibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }
      const time = (performance.now() / 1000) * ((Math.PI * 2) / WAVE_CYCLE);
      ctx.clearRect(0, 0, w, h);
      drawWaves(time);
      drawConnections();
      drawParticles();
      drawVignette();
      updateParticles(time);
      animId = requestAnimationFrame(render);
    };

    resize();
    initParticles();
    animId = requestAnimationFrame(render);

    const onResize = () => {
      resize();
      initParticles();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    const parent = canvas.parentElement;
    if (parent) observer.observe(parent);

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [theme, direction]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
