import React, { useRef, useState } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // max tilt angle in degrees
  glowColor?: string;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = '',
  depth = 12,
  glowColor = 'rgba(59, 130, 246, 0.15)',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const rY = ((x / rect.width) - 0.5) * depth * 2;
    const rX = -(((y / rect.height) - 0.5) * depth * 2);

    setRotX(rX);
    setRotY(rY);
    setMousePos({ x: xPercent, y: yPercent });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="relative transition-transform duration-200 ease-out"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(12px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className={`relative ${className}`}
      >
        {/* Subtle Dynamic 3D Glare effect */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-40 transition-opacity duration-300 z-20"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${glowColor}, transparent 60%)`,
            }}
          />
        )}
        <div style={{ transform: 'translateZ(10px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
