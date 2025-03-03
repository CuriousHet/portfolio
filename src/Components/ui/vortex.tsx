"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex: React.FC<VortexProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<[number, number]>([0, 0]);
  const tickRef = useRef<number>(0);
  const particlePropsRef = useRef<Float32Array>(
    new Float32Array((props.particleCount || 700) * 9)
  );

  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const baseHue = props.baseHue || 220;
  const rangeHue = 100;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = props.backgroundColor || "#000000";
  const noise3D = createNoise3D();

  const TAU = 2 * Math.PI;
  const rand = (n: number) => n * Math.random();
  const randRange = (n: number) => n - rand(2 * n);
  const fadeInOut = (t: number, m: number) =>
    Math.abs(((t + 0.5 * m) % m) - 0.5 * m) / (0.5 * m);
  const lerp = (n1: number, n2: number, speed: number) =>
    (1 - speed) * n1 + speed * n2;

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      centerRef.current = [0.5 * innerWidth, 0.5 * innerHeight];
    }
  }, []);

  const initParticles = useCallback(() => {
    tickRef.current = 0;

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }, [particlePropsLength]);

  const initParticle = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = rand(canvas.width);
    const y = centerRef.current[1] + randRange(rangeY);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);

    particlePropsRef.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    tickRef.current++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }

    renderGlow(canvas, ctx);
    renderToScreen(canvas, ctx);
    window.requestAnimationFrame(draw);
  }, [backgroundColor, particlePropsLength]);

  const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particleProps = particlePropsRef.current;
    const i2 = i + 1, i3 = i + 2, i4 = i + 3, i5 = i + 4, i6 = i + 5;
    const i7 = i + 6, i8 = i + 7, i9 = i + 8;

    const x = particleProps[i];
    const y = particleProps[i2];
    const n = noise3D(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * TAU;
    const vx = lerp(particleProps[i3], Math.cos(n), 0.5);
    const vy = lerp(particleProps[i4], Math.sin(n), 0.5);
    let life = particleProps[i5];
    const ttl = particleProps[i6];
    const speed = particleProps[i7];
    const x2 = x + vx * speed;
    const y2 = y + vy * speed;
    const radius = particleProps[i8];
    const hue = particleProps[i9];

    drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);
    life++;

    particleProps.set([x2, y2, vx, vy, life], i);

    if (checkBounds(x, y, canvas) || life > ttl) {
      initParticle(i);
    }
  };

  const drawParticle = (
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  const checkBounds = (x: number, y: number, canvas: HTMLCanvasElement) =>
    x > canvas.width || x < 0 || y > canvas.height || y < 0;

  const renderGlow = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const renderToScreen = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    resize();
    initParticles();
    draw();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize, initParticles, draw]);

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div ref={containerRef} className="absolute inset-0 z-0">
        <canvas ref={canvasRef}></canvas>
      </motion.div>
      <div className={cn("relative z-10", props.className)}>{props.children}</div>
    </div>
  );
};
