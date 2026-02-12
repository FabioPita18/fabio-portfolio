import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  type: "wave" | "ambient";
  waveIndex: number; // which wave line this particle follows (wave type only)
  phaseOffset: number;
  glowSize: number;
}

const PARTICLE_COUNT = 70;
const WAVE_LINES = 7;
const CONNECTION_DIST = 135;
const WAVE_CYCLE = 7; // seconds for a full oscillation

const ParticleHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

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
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const isWave = i < PARTICLE_COUNT * 0.6;
        particles.push({
          x: Math.random() * w,
          y: isWave
            ? h * 0.35 + Math.random() * h * 0.3
            : Math.random() * h,
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

    const getWaveY = (
      x: number,
      time: number,
      lineIndex: number
    ): number => {
      const centerY = h * 0.5;
      const bandHeight = h * 0.15;
      const lineOffset =
        ((lineIndex - (WAVE_LINES - 1) / 2) / WAVE_LINES) * bandHeight * 2;
      const freq = 0.002 + lineIndex * 0.0003;
      const amp = bandHeight * (0.6 + lineIndex * 0.06);
      const phase = lineIndex * 0.4;
      return (
        centerY +
        lineOffset +
        Math.sin(x * freq + time + phase) * amp * 0.5 +
        Math.sin(x * freq * 1.8 + time * 0.7 + phase * 1.3) * amp * 0.3
      );
    };

    const drawWaves = (time: number) => {
      for (let i = 0; i < WAVE_LINES; i++) {
        const progress = i / (WAVE_LINES - 1);
        const r = Math.floor(150 + progress * 105);
        const alpha = 0.32 + progress * 0.18;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r}, 0, 0, ${alpha})`;
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
      const gradient = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        w * 0.1,
        w * 0.5,
        h * 0.5,
        w * 0.75
      );
      gradient.addColorStop(0, "rgba(40, 0, 0, 0.08)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.25)");
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
            const alpha = 0.15 * (1 - dist / CONNECTION_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
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
        ctx.fillStyle = "#ff0000";
        ctx.shadowColor = "#ff0000";
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
      const time =
        (performance.now() / 1000) * ((Math.PI * 2) / WAVE_CYCLE);

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
      // Re-scatter particles that are now out of bounds
      for (const p of particles) {
        if (p.x > w) p.x = Math.random() * w;
        if (p.y > h) p.y = Math.random() * h;
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleHero;
