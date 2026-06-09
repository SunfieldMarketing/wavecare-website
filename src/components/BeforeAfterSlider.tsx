'use client';

import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER'
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="ba-slider-wrap"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Background (After / Professional Image) */}
      <div className="ba-image after-image">
        <img src={afterImage} alt="After Professional Photography" />
        {afterLabel && <div className="ba-label after-label">{afterLabel}</div>}
      </div>

      {/* Foreground (Before / Stock Image) clipped by sliderPosition */}
      <div 
        className="ba-image before-image" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt="Before Stock Photography" />
        {beforeLabel && <div className="ba-label before-label">{beforeLabel}</div>}
      </div>

      {/* Slider Handle */}
      <div 
        className="ba-handle"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="ba-handle-line"></div>
        <div className="ba-handle-button">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
