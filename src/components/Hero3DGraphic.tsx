import React, { useEffect, useRef, useState } from 'react';
import { RotateCw, Pause, Play, Eye, Sparkles } from 'lucide-react';

interface TechOrbNode {
  name: string;
  category: string;
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

const NODES_DATA: { name: string; category: string; color: string }[] = [
  { name: 'Java Core', category: 'Backend & OOP', color: '#3b82f6' },
  { name: 'React.js', category: 'Frontend UI', color: '#60a5fa' },
  { name: 'Node.js', category: 'Runtime & APIs', color: '#10b981' },
  { name: 'Data Structures', category: 'Algorithms', color: '#818cf8' },
  { name: 'MongoDB & SQL', category: 'Databases', color: '#38bdf8' },
  { name: 'Express API', category: 'Web Services', color: '#6366f1' },
  { name: 'System Design', category: 'Architecture', color: '#93c5fd' },
];

export const Hero3DGraphic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [angleX, setAngleX] = useState(0.3);
  const [angleY, setAngleY] = useState(0.4);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(canvas.parentElement.clientWidth, 400);
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D coordinates on an orbital sphere
    const radius = Math.min(width, height) * 0.38;
    const nodes: TechOrbNode[] = NODES_DATA.map((item, idx) => {
      const phi = Math.acos(-1 + (2 * idx) / NODES_DATA.length);
      const theta = Math.sqrt(NODES_DATA.length * Math.PI) * phi;
      return {
        ...item,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        size: 7,
      };
    });

    // Particle dust field in 3D
    const particles = Array.from({ length: 45 }, () => {
      const r = radius * (0.5 + Math.random() * 0.9);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
      };
    });

    let currentAngleX = angleX;
    let currentAngleY = angleY;

    const render = () => {
      if (isRotating && !isDraggingRef.current) {
        currentAngleY += 0.008;
        currentAngleX = 0.25 + Math.sin(Date.now() * 0.001) * 0.12;
      }

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      // Draw background cybernetic ambient rings
      ctx.save();
      ctx.translate(cx, cy);

      // Outer soft glow
      const bgGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, radius * 1.3);
      bgGrad.addColorStop(0, 'rgba(37, 99, 235, 0.08)');
      bgGrad.addColorStop(0.7, 'rgba(30, 58, 138, 0.03)');
      bgGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Matrix Grid Ring
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.ellipse(0, radius * 0.65, radius * 1.1, radius * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // Transform and project 3D points
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      const project = (px: number, py: number, pz: number) => {
        // Rotate around Y
        const x1 = px * cosY + pz * sinY;
        const z1 = -px * sinY + pz * cosY;
        // Rotate around X
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const fov = 420;
        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
        };
      };

      // Project particles
      particles.forEach((p) => {
        const pt = project(p.x, p.y, p.z);
        if (pt.scale > 0) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * pt.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha * Math.max(0.1, pt.scale)})`;
          ctx.fill();
        }
      });

      // Project Nodes
      const projectedNodes = nodes.map((node) => {
        const proj = project(node.x, node.y, node.z);
        return { ...node, proj };
      });

      // Sort by Z depth (painter's algorithm)
      projectedNodes.sort((a, b) => a.proj.z - b.proj.z);

      // Draw 3D Core Polyhedron lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.22)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z);
          if (dist < radius * 1.3) {
            const alpha = Math.max(0.06, (1 - dist / (radius * 1.3)) * 0.4);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.proj.x, n1.proj.y);
            ctx.lineTo(n2.proj.x, n2.proj.y);
            ctx.stroke();
          }
        }
      }

      // Draw Center Energy Sphere
      const centerProj = project(0, 0, 0);
      const centerGrad = ctx.createRadialGradient(
        centerProj.x,
        centerProj.y,
        0,
        centerProj.x,
        centerProj.y,
        28 * centerProj.scale
      );
      centerGrad.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
      centerGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.35)');
      centerGrad.addColorStop(1, 'rgba(30, 58, 138, 0)');

      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(centerProj.x, centerProj.y, 28 * centerProj.scale, 0, Math.PI * 2);
      ctx.fill();

      // Render 3D Tech Nodes
      projectedNodes.forEach((node) => {
        const { proj, name, color } = node;
        const radiusScaled = Math.max(4, node.size * proj.scale);
        const isHovered = hoveredNode === name;

        // Node Glow Halo
        const glow = ctx.createRadialGradient(
          proj.x,
          proj.y,
          0,
          proj.x,
          proj.y,
          radiusScaled * (isHovered ? 3.5 : 2.2)
        );
        glow.addColorStop(0, color);
        glow.addColorStop(1, 'rgba(15, 23, 42, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, radiusScaled * (isHovered ? 3.5 : 2.2), 0, Math.PI * 2);
        ctx.fill();

        // Node Solid Core
        ctx.fillStyle = isHovered ? '#ffffff' : color;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, radiusScaled, 0, Math.PI * 2);
        ctx.fill();

        // Node Label Pill
        const fontSize = Math.max(9, Math.round(11 * proj.scale));
        ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
        const textWidth = ctx.measureText(name).width;

        const pillPaddingX = 6;
        const pillHeight = fontSize + 6;
        const pillX = proj.x - textWidth / 2 - pillPaddingX;
        const pillY = proj.y + radiusScaled + 4;

        // Pill background
        ctx.fillStyle = isHovered
          ? 'rgba(15, 23, 42, 0.95)'
          : 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = isHovered ? color : 'rgba(71, 85, 105, 0.6)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(pillX, pillY, textWidth + pillPaddingX * 2, pillHeight, 4);
        ctx.fill();
        ctx.stroke();

        // Pill text
        ctx.fillStyle = isHovered ? '#ffffff' : '#cbd5e1';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, proj.x, pillY + pillHeight / 2);
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isRotating, hoveredNode, angleX, angleY]);

  // Mouse Interaction handlers for 3D rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseRef.current.x;
    const deltaY = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    setAngleY((prev) => prev + deltaX * 0.008);
    setAngleX((prev) => Math.max(-1.2, Math.min(1.2, prev + deltaY * 0.008)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Canvas Viewport */}
      <div className="relative w-full aspect-square max-w-[380px] rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-2xl overflow-hidden group cursor-grab active:cursor-grabbing">
        {/* Top Header Controls */}
        <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300 shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-semibold text-slate-200">3D Architecture Core</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRotating(!isRotating)}
              title={isRotating ? 'Pause rotation' : 'Resume auto-rotation'}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                setAngleX(0.3);
                setAngleY(0.4);
              }}
              title="Reset 3D camera angle"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full h-full block"
        />

        {/* Bottom Interactive Hint */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between px-3 py-1 rounded bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-blue-400" />
            <span>Drag to rotate 3D orbit</span>
          </span>
          <span className="text-blue-400">60 FPS Real-Time</span>
        </div>
      </div>
    </div>
  );
};
