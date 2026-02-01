import React, { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({ children, direction = 'left', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${className}
        ${isVisible
          ? 'opacity-100 translate-x-0'
          : `opacity-0 translate-x-${direction === 'left' ? '-10' : '10'}`
        }`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;