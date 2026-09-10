import React, { useEffect, useRef, useState } from 'react';
import { Eye, Rotate3d, Zap, Compass } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Mesh3D {
  center: Point3D;
  vertices: Point3D[];
  edges: [number, number][];
  rotX: number;
  rotY: number;
  rotZ: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  color: string;
  size: number;
  pulsePhase: number;
}

export const ThreeDWorld: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [interactiveMode, setInteractiveMode] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [wireframeOnly, setWireframeOnly] = useState<boolean>(false);
  const [showHud, setShowHud] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = Math.max(100, window.innerWidth || 1200));
    let height = (canvas.height = Math.max(100, window.innerHeight || 800));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.max(100, window.innerWidth || 1200);
      height = canvas.height = Math.max(100, window.innerHeight || 800);
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D camera
    let mouseX = 0;
    let mouseY = 0;
    let targetCamRotX = 0;
    let targetCamRotY = 0;
    let camRotX = 0;
    let camRotY = 0;
    let scrollY = window.scrollY || 0;

    const handleMouseMove = (e: MouseEvent) => {
      const w = width > 0 ? width : 1200;
      const h = height > 0 ? height : 800;
      mouseX = (e.clientX / w - 0.5) * 2;
      mouseY = (e.clientY / h - 0.5) * 2;
      targetCamRotY = mouseX * 0.45;
      targetCamRotX = -mouseY * 0.45;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate 3D Starfield / Particle Nodes
    const PARTICLE_COUNT = 160;
    const particles: (Point3D & { vx: number; vy: number; vz: number; size: number; alpha: number })[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2600,
        y: (Math.random() - 0.5) * 2600,
        z: Math.random() * 2000 - 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    // Geometry Helpers: Icosahedron, Octahedron, Cube, Torus Ring
    function createIcosahedron(size: number): { vertices: Point3D[]; edges: [number, number][] } {
      const phi = (1 + Math.sqrt(5)) / 2;
      const v: Point3D[] = [
        { x: -1, y: phi, z: 0 },
        { x: 1, y: phi, z: 0 },
        { x: -1, y: -phi, z: 0 },
        { x: 1, y: -phi, z: 0 },
        { x: 0, y: -1, z: phi },
        { x: 0, y: 1, z: phi },
        { x: 0, y: -1, z: -phi },
        { x: 0, y: 1, z: -phi },
        { x: phi, y: 0, z: -1 },
        { x: phi, y: 0, z: 1 },
        { x: -phi, y: 0, z: -1 },
        { x: -phi, y: 0, z: 1 },
      ].map((p) => {
        const len = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
        return { x: (p.x / len) * size, y: (p.y / len) * size, z: (p.z / len) * size };
      });

      const edges: [number, number][] = [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
        [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
        [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
        [9, 4], [4, 2], [2, 6], [6, 8], [8, 9],
        [4, 5], [5, 9], [9, 1], [1, 8], [8, 7],
        [7, 6], [6, 10], [10, 2], [2, 11], [11, 4],
      ];
      return { vertices: v, edges };
    }

    function createCube(size: number): { vertices: Point3D[]; edges: [number, number][] } {
      const s = size / 2;
      const v: Point3D[] = [
        { x: -s, y: -s, z: -s },
        { x: s, y: -s, z: -s },
        { x: s, y: s, z: -s },
        { x: -s, y: s, z: -s },
        { x: -s, y: -s, z: s },
        { x: s, y: -s, z: s },
        { x: s, y: s, z: s },
        { x: -s, y: s, z: s },
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];
      return { vertices: v, edges };
    }

    function createOctahedron(size: number): { vertices: Point3D[]; edges: [number, number][] } {
      const v: Point3D[] = [
        { x: size, y: 0, z: 0 },
        { x: -size, y: 0, z: 0 },
        { x: 0, y: size, z: 0 },
        { x: 0, y: -size, z: 0 },
        { x: 0, y: 0, z: size },
        { x: 0, y: 0, z: -size },
      ];
      const edges: [number, number][] = [
        [0, 2], [2, 1], [1, 3], [3, 0],
        [0, 4], [1, 4], [2, 4], [3, 4],
        [0, 5], [1, 5], [2, 5], [3, 5],
      ];
      return { vertices: v, edges };
    }

    function createTorusRing(radius: number, tubeRadius: number, segments: number): { vertices: Point3D[]; edges: [number, number][] } {
      const v: Point3D[] = [];
      const edges: [number, number][] = [];
      const steps = segments;

      for (let i = 0; i < steps; i++) {
        const u = (i / steps) * Math.PI * 2;
        v.push({
          x: Math.cos(u) * radius,
          y: Math.sin(u) * (radius * 0.4),
          z: Math.sin(u) * radius,
        });
        edges.push([i, (i + 1) % steps]);
      }
      return { vertices: v, edges };
    }

    // Initialize 3D Meshes positioned across depth layers
    const ico = createIcosahedron(85);
    const cube = createCube(90);
    const octa = createOctahedron(75);
    const ring1 = createTorusRing(120, 15, 24);
    const ring2 = createTorusRing(160, 15, 28);
    const icoSmall = createIcosahedron(55);

    const meshes: Mesh3D[] = [
      {
        center: { x: -480, y: -180, z: 250 },
        vertices: ico.vertices,
        edges: ico.edges,
        rotX: 0.2,
        rotY: 0.3,
        rotZ: 0.1,
        speedX: 0.008,
        speedY: 0.012,
        speedZ: 0.005,
        color: '#3b82f6',
        size: 85,
        pulsePhase: 0,
      },
      {
        center: { x: 520, y: 120, z: 320 },
        vertices: cube.vertices,
        edges: cube.edges,
        rotX: 0.5,
        rotY: 0.8,
        rotZ: 0.2,
        speedX: -0.007,
        speedY: 0.009,
        speedZ: 0.006,
        color: '#60a5fa',
        size: 90,
        pulsePhase: 1.5,
      },
      {
        center: { x: -350, y: 380, z: 400 },
        vertices: octa.vertices,
        edges: octa.edges,
        rotX: 0.1,
        rotY: 0.4,
        rotZ: 0.7,
        speedX: 0.01,
        speedY: -0.008,
        speedZ: 0.007,
        color: '#38bdf8',
        size: 75,
        pulsePhase: 3.0,
      },
      {
        center: { x: 420, y: -320, z: 450 },
        vertices: ring1.vertices,
        edges: ring1.edges,
        rotX: 0.8,
        rotY: 0.2,
        rotZ: 0.3,
        speedX: 0.005,
        speedY: 0.015,
        speedZ: -0.004,
        color: '#2563eb',
        size: 120,
        pulsePhase: 4.2,
      },
      {
        center: { x: -60, y: 480, z: 550 },
        vertices: ring2.vertices,
        edges: ring2.edges,
        rotX: 0.3,
        rotY: 0.6,
        rotZ: 0.2,
        speedX: -0.006,
        speedY: 0.008,
        speedZ: 0.005,
        color: '#1d4ed8',
        size: 160,
        pulsePhase: 5.1,
      },
      {
        center: { x: 380, y: 520, z: 300 },
        vertices: icoSmall.vertices,
        edges: icoSmall.edges,
        rotX: 0.4,
        rotY: 0.2,
        rotZ: 0.5,
        speedX: 0.009,
        speedY: -0.011,
        speedZ: 0.004,
        color: '#60a5fa',
        size: 55,
        pulsePhase: 2.1,
      },
    ];

    // 3D Math Utilities
    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
    };

    const rotateZ = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos, z: p.z };
    };

    // Camera projection (FOV = 650)
    const FOV = 650;
    const project = (p: Point3D, cx: number, cy: number): { x: number; y: number; scale: number; visible: boolean } => {
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.z)) {
        return { x: 0, y: 0, scale: 0, visible: false };
      }
      const zDist = p.z + FOV;
      if (zDist <= 10) return { x: 0, y: 0, scale: 0, visible: false };
      const scale = FOV / zDist;
      return {
        x: cx + p.x * scale,
        y: cy + p.y * scale,
        scale,
        visible: true,
      };
    };

    let tick = 0;

    const render = () => {
      try {
        tick++;
        ctx.clearRect(0, 0, width, height);

        // Smooth camera interpolation
        if (Number.isFinite(targetCamRotX)) {
          camRotX += (targetCamRotX - camRotX) * 0.05;
        }
        if (Number.isFinite(targetCamRotY)) {
          camRotY += (targetCamRotY - camRotY) * 0.05;
        }

      const cx = width / 2;
      const cy = height / 2;

      // Scroll camera offset: moves camera slightly down and turns subtly with scroll
      const scrollOffsetZ = Math.sin(scrollY * 0.001) * 80;
      const scrollOffsetY = (scrollY * 0.12) % 400;

      // 1. Render 3D Background Ground Plane / Grid Waves
      ctx.lineWidth = 1;
      const gridCols = 14;
      const gridSpacing = 160;
      const gridZStart = 100;
      const gridZEnd = 1600;
      const gridZSteps = 8;
      const groundY = 320;

      ctx.strokeStyle = 'rgba(30, 58, 138, 0.14)';
      ctx.beginPath();

      for (let c = -gridCols; c <= gridCols; c += 2) {
        let first = true;
        for (let s = 0; s <= gridZSteps; s++) {
          const z = gridZStart + (s / gridZSteps) * (gridZEnd - gridZStart);
          const x = c * gridSpacing;
          const waveY = groundY + Math.sin(x * 0.004 + tick * 0.02) * 20;

          // Camera transform
          let p: Point3D = { x, y: waveY, z: z - scrollOffsetZ };
          p = rotateY(p, camRotY * 0.4);
          p = rotateX(p, camRotX * 0.4 + 0.15);

          const proj = project(p, cx, cy);
          if (proj.visible) {
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        }
      }
      ctx.stroke();

      // 2. Update and Render 3D Particle Constellation
      const visiblePoints: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        pt.x += pt.vx * speedMultiplier;
        pt.y += pt.vy * speedMultiplier;
        pt.z += pt.vz * speedMultiplier;

        // Wrap around bounds
        if (pt.z > 1800) pt.z = -300;
        if (pt.z < -300) pt.z = 1800;
        if (pt.x > 1400) pt.x = -1400;
        if (pt.x < -1400) pt.x = 1400;
        if (pt.y > 1400) pt.y = -1400;
        if (pt.y < -1400) pt.y = 1400;

        // Apply camera rotation
        let pRot = rotateY(pt, camRotY * 0.6);
        pRot = rotateX(pRot, camRotX * 0.6);

        const proj = project(pRot, cx, cy);
        if (proj.visible) {
          const depthAlpha = Math.max(0.1, Math.min(0.85, (1800 - pt.z) / 1800)) * pt.alpha;
          const radius = Math.max(0.6, pt.size * proj.scale);

          ctx.fillStyle = `rgba(147, 197, 253, ${depthAlpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2);
          ctx.fill();

          visiblePoints.push({
            x: proj.x,
            y: proj.y,
            z: pt.z,
            size: radius,
            alpha: depthAlpha,
          });
        }
      }

      // Connect closest particle pairs in 3D constellation
      ctx.lineWidth = 0.8;
      for (let i = 0; i < visiblePoints.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 8, visiblePoints.length); j++) {
          const dx = visiblePoints[i].x - visiblePoints[j].x;
          const dy = visiblePoints[i].y - visiblePoints[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 7000) {
            const lineAlpha = (1 - distSq / 7000) * 0.18;
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(visiblePoints[i].x, visiblePoints[i].y);
            ctx.lineTo(visiblePoints[j].x, visiblePoints[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Render 3D Rotating Polyhedra Meshes
      for (const mesh of meshes) {
        mesh.rotX += mesh.speedX * speedMultiplier;
        mesh.rotY += mesh.speedY * speedMultiplier;
        mesh.rotZ += mesh.speedZ * speedMultiplier;
        mesh.pulsePhase += 0.02;

        // Mesh position in world with gentle floating
        const floatY = Math.sin(mesh.pulsePhase) * 20;
        const currentCenter: Point3D = {
          x: mesh.center.x,
          y: mesh.center.y + floatY - (scrollY * 0.08) % 600,
          z: mesh.center.z + Math.cos(mesh.pulsePhase * 0.7) * 40,
        };

        // Project Center
        let centerRot = rotateY(currentCenter, camRotY);
        centerRot = rotateX(centerRot, camRotX);
        const centerProj = project(centerRot, cx, cy);

        if (!centerProj.visible) continue;

        // Transform vertices
        const projectedVerts = mesh.vertices.map((v) => {
          let rotated = rotateX(v, mesh.rotX);
          rotated = rotateY(rotated, mesh.rotY);
          rotated = rotateZ(rotated, mesh.rotZ);

          const worldPos: Point3D = {
            x: currentCenter.x + rotated.x,
            y: currentCenter.y + floatY + rotated.y,
            z: currentCenter.z + rotated.z,
          };

          let worldRot = rotateY(worldPos, camRotY);
          worldRot = rotateX(worldRot, camRotX);

          return project(worldRot, cx, cy);
        });

        // Draw Edges
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = mesh.color + '55'; // semi-transparent wireframe

        for (const [v1, v2] of mesh.edges) {
          const p1 = projectedVerts[v1];
          const p2 = projectedVerts[v2];
          if (p1?.visible && p2?.visible) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw Glowing Vertices
        for (const pv of projectedVerts) {
          if (pv?.visible) {
            ctx.fillStyle = mesh.color;
            ctx.beginPath();
            ctx.arc(pv.x, pv.y, 2.2 * pv.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Center Glow Core
        const glowRadius = Math.max(8, 26 * centerProj.scale);
        if (Number.isFinite(centerProj.x) && Number.isFinite(centerProj.y) && Number.isFinite(glowRadius) && glowRadius > 0) {
          const grad = ctx.createRadialGradient(
            centerProj.x,
            centerProj.y,
            0,
            centerProj.x,
            centerProj.y,
            glowRadius
          );
          grad.addColorStop(0, mesh.color + '33');
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(centerProj.x, centerProj.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      } catch (err) {
        // Prevent render frame error from crashing the application
        console.debug('[ThreeDWorld render frame]', err);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speedMultiplier, wireframeOnly]);

  return (
    <>
      {/* Fixed Fullscreen 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-85"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Floating 3D Graphic Controls HUD in Bottom Right */}
      <div className="fixed bottom-5 right-5 z-40">
        <div className="relative">
          {showHud && (
            <div className="absolute bottom-12 right-0 w-64 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl text-xs space-y-3.5 mb-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Rotate3d className="w-4 h-4 text-blue-400" />
                  <span>3D Graphic Engine</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-950 text-[10px] font-mono text-blue-400 border border-blue-800/60">
                  WebGL / 3D Canvas
                </span>
              </div>

              {/* Speed Controls */}
              <div>
                <span className="text-slate-400 block mb-1.5 font-mono text-[11px]">Orbit Speed</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: '0.5x', val: 0.5 },
                    { label: '1.0x', val: 1 },
                    { label: '2.0x', val: 2 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setSpeedMultiplier(item.val)}
                      className={`py-1 rounded-lg font-mono text-center transition-colors cursor-pointer ${
                        speedMultiplier === item.val
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status information */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Parallax: Active</span>
                <span className="text-emerald-400">60 FPS</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowHud((prev) => !prev)}
            id="three-d-hud-toggle-btn"
            title="Toggle 3D Graphics Controls"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800/90 border border-blue-500/30 text-xs font-mono text-blue-400 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-blue-400 cursor-pointer"
          >
            <Rotate3d className="w-4 h-4 text-blue-400 animate-spin-slow" />
            <span className="hidden sm:inline">3D Graphics Active</span>
          </button>
        </div>
      </div>
    </>
  );
};
