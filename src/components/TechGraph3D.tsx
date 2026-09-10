import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, RotateCcw, Compass, Layers, ShieldCheck, Zap } from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  category: 'core' | 'frontend' | 'backend' | 'database' | 'cs';
  color: string;
  x: number;
  y: number;
  z: number;
  vx?: number;
  vy?: number;
  vz?: number;
  connections: string[];
}

const rawNodes: Omit<TechNode, 'x' | 'y' | 'z'>[] = [
  { id: 'java', name: 'Java', category: 'core', color: '#60a5fa', connections: ['oop', 'dsa', 'backend'] },
  { id: 'python', name: 'Python', category: 'core', color: '#38bdf8', connections: ['dsa', 'data', 'nlp'] },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', color: '#facc15', connections: ['react', 'nodejs', 'frontend'] },
  { id: 'react', name: 'React.js', category: 'frontend', color: '#67e8f9', connections: ['javascript', 'htmlcss', 'nodejs'] },
  { id: 'htmlcss', name: 'HTML5 & CSS3', category: 'frontend', color: '#f97316', connections: ['react', 'javascript'] },
  { id: 'nodejs', name: 'Node.js', category: 'backend', color: '#4ade80', connections: ['express', 'javascript', 'mongodb'] },
  { id: 'express', name: 'Express.js', category: 'backend', color: '#a3e635', connections: ['nodejs', 'rest', 'mongodb'] },
  { id: 'rest', name: 'REST APIs', category: 'backend', color: '#34d399', connections: ['express', 'react', 'java'] },
  { id: 'mongodb', name: 'MongoDB', category: 'database', color: '#10b981', connections: ['nodejs', 'sql', 'database'] },
  { id: 'sql', name: 'SQL & DBMS', category: 'database', color: '#2dd4bf', connections: ['mongodb', 'backend', 'java'] },
  { id: 'dsa', name: 'Data Structures', category: 'cs', color: '#818cf8', connections: ['java', 'python', 'oop', 'algorithms'] },
  { id: 'algorithms', name: 'Algorithms', category: 'cs', color: '#a78bfa', connections: ['dsa', 'problem_solving'] },
  { id: 'oop', name: 'OOP', category: 'cs', color: '#c084fc', connections: ['java', 'dsa'] },
  { id: 'problem_solving', name: 'Problem Solving', category: 'cs', color: '#e879f9', connections: ['algorithms', 'dsa'] },
  { id: 'nlp', name: 'NLP & AI Basics', category: 'core', color: '#f472b6', connections: ['python', 'data'] },
  { id: 'git', name: 'Git & GitHub', category: 'core', color: '#fb7185', connections: ['javascript', 'java'] },
];

export const TechGraph3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeNode, setActiveNode] = useState<TechNode | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const rotationRef = useRef({ rotX: 0.2, rotY: 0.3 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Distribute nodes evenly around a 3D sphere using Fibonacci sphere algorithm
    const radius = 175;
    const count = rawNodes.length;
    const nodes: TechNode[] = rawNodes.map((node, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        ...node,
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
      };
    });

    const nodeMap = new Map<string, TechNode>();
    nodes.forEach((n) => nodeMap.set(n.id, n));

    const render = () => {
      try {
        if (isRotating && !isDraggingRef.current) {
          rotationRef.current.rotY += 0.005;
          rotationRef.current.rotX += 0.002;
        }

        // Resize canvas cleanly with robust fallback dimensions
        const width = (canvas.width = Math.max(320, canvas.parentElement?.clientWidth || 700));
        const height = (canvas.height = Math.max(240, Math.min(width * 0.75, 480)));
        const centerX = width / 2;
        const centerY = height / 2;
        const fov = 400;

        ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(rotationRef.current.rotX);
      const sinX = Math.sin(rotationRef.current.rotX);
      const cosY = Math.cos(rotationRef.current.rotY);
      const sinY = Math.sin(rotationRef.current.rotY);

      // Rotate nodes and project to 2D
      const projectedNodes = nodes.map((node) => {
        // Rotate around Y
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // Rotate around X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        // Perspective projection
        const scale = fov / (fov + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        const alpha = Math.max(0.2, Math.min(1, (z2 + radius) / (2 * radius) + 0.3));

        return {
          ...node,
          projX,
          projY,
          projZ: z2,
          scale,
          alpha,
        };
      });

      // Sort by Z for proper 3D depth rendering (back to front)
      projectedNodes.sort((a, b) => a.projZ - b.projZ);

      // Draw subtle orbital rings
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 1.1, radius * 0.35, rotationRef.current.rotX, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 1.25, radius * 0.45, -rotationRef.current.rotY * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Draw connection lines
      ctx.save();
      const drawnPairs = new Set<string>();

      projectedNodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = projectedNodes.find((n) => n.id === targetId);
          if (target) {
            const pairKey = [node.id, target.id].sort().join('-');
            if (!drawnPairs.has(pairKey)) {
              drawnPairs.add(pairKey);

              const isHighlighted =
                activeNode && (activeNode.id === node.id || activeNode.id === target.id);
              const lineAlpha = isHighlighted
                ? 0.85
                : Math.min(node.alpha, target.alpha) * 0.25;

              ctx.beginPath();
              ctx.moveTo(node.projX, node.projY);
              ctx.lineTo(target.projX, target.projY);

              if (isHighlighted) {
                ctx.strokeStyle = 'rgba(129, 140, 248, 0.9)';
                ctx.lineWidth = 2.5;
              } else {
                ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
                ctx.lineWidth = 1.2;
              }
              ctx.stroke();
            }
          }
        });
      });
      ctx.restore();

      // Draw Nodes
      projectedNodes.forEach((node) => {
        const isHovered = activeNode?.id === node.id;
        const nodeRadius = isHovered
          ? 16 * node.scale
          : (node.id === 'java' || node.id === 'react' || node.id === 'nodejs' ? 12 : 9) * node.scale;

        // Outer glow
        const glowR = Math.max(1, nodeRadius * 2.8);
        if (Number.isFinite(node.projX) && Number.isFinite(node.projY) && Number.isFinite(glowR)) {
          const glowGradient = ctx.createRadialGradient(
            node.projX,
            node.projY,
            1,
            node.projX,
            node.projY,
            glowR
          );
          glowGradient.addColorStop(0, `${node.color}55`);
          glowGradient.addColorStop(1, 'transparent');

          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node core
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, Math.max(3, nodeRadius || 6), 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ffffff' : node.color;
        ctx.fill();

        ctx.lineWidth = isHovered ? 3 : 1.5;
        ctx.strokeStyle = isHovered ? '#6366f1' : 'rgba(15, 23, 42, 0.9)';
        ctx.stroke();

        // Node label
        ctx.save();
        ctx.font = `${isHovered ? 'bold 13px' : '600 11px'} 'Plus Jakarta Sans', system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Background pill behind text for high readability
        const textMetrics = ctx.measureText(node.name);
        const textWidth = textMetrics.width;
        const textY = node.projY + nodeRadius + 14;

        ctx.fillStyle = isHovered ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.75)';
        ctx.strokeStyle = isHovered ? 'rgba(99, 102, 241, 0.6)' : 'rgba(51, 65, 85, 0.5)';
        ctx.lineWidth = 1;

        const padX = 6;
        const padY = 3;
        ctx.beginPath();
        ctx.roundRect(
          node.projX - textWidth / 2 - padX,
          textY - 7 - padY,
          textWidth + padX * 2,
          14 + padY * 2,
          6
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isHovered ? '#ffffff' : `rgba(226, 232, 240, ${Math.max(0.6, node.alpha)})`;
        ctx.fillText(node.name, node.projX, textY);
        ctx.restore();
      });
      } catch (err) {
        console.debug('[TechGraph3D render frame]', err);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse Interaction Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isDraggingRef.current) {
        const dx = e.clientX - lastMouseRef.current.x;
        const dy = e.clientY - lastMouseRef.current.y;
        rotationRef.current.rotY += dx * 0.008;
        rotationRef.current.rotX += dy * 0.008;
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
      } else {
        // Detect hovered node
        const cosX = Math.cos(rotationRef.current.rotX);
        const sinX = Math.sin(rotationRef.current.rotX);
        const cosY = Math.cos(rotationRef.current.rotY);
        const sinY = Math.sin(rotationRef.current.rotY);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const fov = 400;

        let found: TechNode | null = null;
        for (const n of nodes) {
          const x1 = n.x * cosY - n.z * sinY;
          const z1 = n.z * cosY + n.x * sinY;
          const y2 = n.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + n.y * sinX;
          const scale = fov / (fov + z2);
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;
          const dist = Math.hypot(mouseX - px, mouseY - py);
          if (dist < 22) {
            found = n;
            break;
          }
        }
        setActiveNode(found);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const dx = e.touches[0].clientX - lastMouseRef.current.x;
        const dy = e.touches[0].clientY - lastMouseRef.current.y;
        rotationRef.current.rotY += dx * 0.01;
        rotationRef.current.rotX += dy * 0.01;
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRotating]);

  return (
    <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-blue-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive 3D Tech Orbit</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Interconnected Architecture & Competencies
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Drag to rotate the 3D ecosystem. Hover over any node to inspect interconnected technology clusters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isRotating
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Auto Orbiting' : 'Paused'}</span>
          </button>

          <button
            onClick={() => {
              rotationRef.current = { rotX: 0.2, rotY: 0.3 };
            }}
            title="Reset orientation"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none py-2">
        <canvas ref={canvasRef} className="w-full max-w-2xl h-[360px] sm:h-[420px]" />

        {/* Selected / Hovered Node Insight Box */}
        {activeNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xs p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 shadow-xl text-left pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeNode.color }} />
                {activeNode.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/40">
                {activeNode.category}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Integrated across Abhishek&apos;s full-stack applications, academic coursework, and problem-solving projects.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3 h-3" />
              <span>Direct Skill Alignment</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer legend */}
      <div className="mt-2 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <span>Core Languages</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span>Frontend Interfaces</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>Backend & Databases</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span>Computer Science</span>
        </div>
      </div>
    </div>
  );
};
