import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatNumber?: boolean;
}

export const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 1800, 
  className = '',
  prefix = '',
  suffix = '',
  formatNumber = true
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Immediate fallback trigger after 50ms if intersection observer doesn't fire
    let isCancelled = false;
    let animationFrameId: number;

    const startAnimation = () => {
      if (hasAnimated.current || isCancelled) return;
      hasAnimated.current = true;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        if (isCancelled) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(easeProgress * end);
        
        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    // If intersection observer is supported, observe
    if ('IntersectionObserver' in window && countRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(countRef.current);

      // Fallback timer: ensure it triggers even if observer is skipped
      const timer = setTimeout(() => {
        startAnimation();
      }, 400);

      return () => {
        isCancelled = true;
        clearTimeout(timer);
        observer.disconnect();
        cancelAnimationFrame(animationFrameId);
      };
    } else {
      startAnimation();
      return () => {
        isCancelled = true;
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [end, duration]);

  const displayValue = formatNumber 
    ? count.toLocaleString('uz-UZ') 
    : count.toString();

  return (
    <span ref={countRef} className={`inline-block tabular-nums font-black ${className}`}>
      {prefix}{displayValue || end}{suffix}
    </span>
  );
};

