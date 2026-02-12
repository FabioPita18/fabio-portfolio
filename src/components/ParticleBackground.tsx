import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  theme: "red" | "dark";
  direction: "ltr" | "rtl";
  mode: "dark" | "light";
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
const WAVE_CYCLE = 7;
const PARTICLES_PER_900PX = 49;

const ParticleBackground = ({ theme, direction, mode }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const isLight = mode === "light";

    // Dark mode: red zones get red particles, dark zones get black particles
    // Light mode: red zones (white bg) get dark grey particles, dark zones (grey bg) get red particles
    let waveBaseAlpha: number;
    let waveAlphaRange: number;
    let particleFill: string;
    let particleGlow: string;
    let vigInner: string;
    let vigOuter: string;
    let waveColor: (progress: number, alpha: number) => string;

    if (isLight) {
      if (isRed) {
        // Light mode, "red" zone (white bg) → dark grey particles & waves
        waveBaseAlpha = 0.15;
        waveAlphaRange = 0.15;
        particleFill = "rgba(0,0,0,0.5)";
        particleGlow = "rgba(0,0,0,0.3)";
        vigInner = "rgba(0,0,0,0.02)";
        vigOuter = "rgba(0,0,0,0.08)";
        waveColor = (_progress: number, alpha: number) =>
          `rgba(0,0,0,${alpha})`;
      } else {
        // Light mode, "dark" zone (grey bg) → red particles & waves
        waveBaseAlpha = 0.2;
        waveAlphaRange = 0.15;
        particleFill = "#cc0000";
        particleGlow = "rgba(200,0,0,0.4)";
        vigInner = "rgba(0,0,0,0.01)";
        vigOuter = "rgba(0,0,0,0.06)";
        waveColor = (progress: number, alpha: number) =>
          `rgba(${Math.floor(150 + progress * 55)},0,0,${alpha})`;
      }
    } else {
      if (isRed) {
        // Dark mode, "red" zone (black bg) → red particles & waves
        waveBaseAlpha = 0.32;
        waveAlphaRange = 0.18;
        particleFill = "#ff0000";
        particleGlow = "#ff0000";
        vigInner = "rgba(40,0,0,0.08)";
        vigOuter = "rgba(0,0,0,0.25)";
        waveColor = (progress: number, alpha: number) =>
          `rgba(${Math.floor(150 + progress * 105)},0,0,${alpha})`;
      } else {
        // Dark mode, "dark" zone (maroon bg) → black particles & waves
        waveBaseAlpha = 0.25;
        waveAlphaRange = 0.25;
        particleFill = "rgba(0,0,0,0.7)";
        particleGlow = "rgba(0,0,0,0.5)";
        vigInner = "rgba(0,0,0,0.03)";
        vigOuter = "rgba(0,0,0,0.15)";
        waveColor = (_progress: number, alpha: number) =>
          `rgba(0,0,0,${alpha})`;
      }
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const isMobile = w < 768;
      const perPage = isMobile ? 30 : PARTICLES_PER_900PX;
      const floor = isMobile ? 15 : 28;
      const count = Math.max(floor, Math.round((h / 900) * perPage));
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
      const grad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        w * 0.1,
        w * 0.5,
        h * 0.5,
        r
      );
      grad.addColorStop(0, vigInner);
      grad.addColorStop(1, vigOuter);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
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
          p.vx *= 0.995;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        } else {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
          p.vx *= 0.99;
          p.vy *= 0.99;
          const maxV = 0.3;
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

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      const time = (now / 1000) * ((Math.PI * 2) / WAVE_CYCLE);
      ctx.clearRect(0, 0, w, h);
      drawWaves(time);
      drawParticles();
      drawVignette();
      updateParticles(time);
    };

    const startLoop = () => {
      if (animId) return;
      animId = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    resize();
    initParticles();
    startLoop();

    const onResize = () => {
      resize();
      initParticles();
    };

    const parent = canvas.parentElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0 }
    );
    if (parent) observer.observe(parent);

    window.addEventListener("resize", onResize);
    return () => {
      stopLoop();
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [theme, direction, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none will-change-transform"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
