import React, { useState, useRef, useEffect } from 'react';

const AdvancedScroll = ({ children, horizontal = false }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const lastScrollPositionRef = useRef(0);
  const animationFrameRef = useRef(null);
  const hideScrollbarTimeoutRef = useRef(null);

  // 滚动条样式
  const scrollbarStyles = `
    /* 滚动条基础样式 */
    ::-webkit-scrollbar {
      width: ${horizontal ? '6px' : '6px'};
      height: ${horizontal ? '6px' : '6px'};
    }
    
    /* 滚动条轨道 */
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
      background: rgba(51, 51, 51, 0.5);
      border-radius: 3px;
      transition: all 0.3s ease;
    }
    
    /* 滚动条滑块悬停 */
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(51, 51, 51, 0.7);
      width: ${horizontal ? '8px' : '8px'};
      height: ${horizontal ? '8px' : '8px'};
    }
    
    /* Firefox 滚动条 */
    * {
      scrollbar-width: thin;
      scrollbar-color: rgba(51, 51, 51, 0.5) transparent;
    }
  `;

  // 计算滚动进度
  const calculateScrollProgress = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLength = horizontal
      ? container.scrollWidth - container.clientWidth
      : container.scrollHeight - container.clientHeight;

    if (scrollLength > 0) {
      const currentScroll = horizontal ? container.scrollLeft : container.scrollTop;
      const progress = (currentScroll / scrollLength) * 100;
      setScrollProgress(progress);
    }
  };

  // 处理滚动事件
  const handleScroll = () => {
    setIsScrolling(true);
    calculateScrollProgress();

    // 清除之前的隐藏定时器
    if (hideScrollbarTimeoutRef.current) {
      clearTimeout(hideScrollbarTimeoutRef.current);
    }

    // 设置新的隐藏定时器
    hideScrollbarTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  // 处理触摸开始
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = Date.now();
    lastScrollTimeRef.current = Date.now();
    lastScrollPositionRef.current = horizontal
      ? scrollContainerRef.current.scrollLeft
      : scrollContainerRef.current.scrollTop;

    // 清除动画帧
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // 处理触摸移动
  const handleTouchMove = (e) => {
    if (!scrollContainerRef.current) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartXRef.current;
    const deltaY = currentY - touchStartYRef.current;

    if (horizontal) {
      scrollContainerRef.current.scrollLeft -= deltaX;
    } else {
      scrollContainerRef.current.scrollTop -= deltaY;
    }

    touchStartXRef.current = currentX;
    touchStartYRef.current = currentY;
    lastScrollTimeRef.current = Date.now();
    lastScrollPositionRef.current = horizontal
      ? scrollContainerRef.current.scrollLeft
      : scrollContainerRef.current.scrollTop;
  };

  // 处理触摸结束，实现惯性滚动
  const handleTouchEnd = () => {
    if (!scrollContainerRef.current) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTimeRef.current;
    const currentPosition = horizontal
      ? scrollContainerRef.current.scrollLeft
      : scrollContainerRef.current.scrollTop;
    const distance = currentPosition - lastScrollPositionRef.current;

    // 计算速度
    const velocity = distance / timeDiff;

    // 惯性滚动参数
    const friction = 0.95;
    const minVelocity = 0.1;
    let currentVelocity = velocity;
    let startTime = currentTime;
    let startPosition = currentPosition;

    // 惯性滚动动画
    const animateInertia = (timestamp) => {
      const elapsed = timestamp - startTime;
      const deltaTime = elapsed / 16; // 60fps

      // 更新速度
      currentVelocity *= friction;

      // 更新位置
      const newPosition = startPosition + currentVelocity * deltaTime * 10;

      if (horizontal) {
        scrollContainerRef.current.scrollLeft = newPosition;
      } else {
        scrollContainerRef.current.scrollTop = newPosition;
      }

      // 检查是否需要继续动画
      if (Math.abs(currentVelocity) > minVelocity) {
        animationFrameRef.current = requestAnimationFrame(animateInertia);
      }
    };

    // 启动惯性滚动
    if (Math.abs(velocity) > 0.5) {
      animationFrameRef.current = requestAnimationFrame(animateInertia);
    }
  };

  // 处理鼠标滚轮，支持惯性滚动
  const handleWheel = (e) => {
    if (!scrollContainerRef.current) return;

    e.preventDefault();

    const delta = horizontal ? e.deltaX : e.deltaY;
    const speed = Math.abs(delta) * 0.5;

    if (horizontal) {
      scrollContainerRef.current.scrollLeft += delta;
    } else {
      scrollContainerRef.current.scrollTop += delta;
    }
  };

  // 清理定时器和动画帧
  useEffect(() => {
    return () => {
      if (hideScrollbarTimeoutRef.current) {
        clearTimeout(hideScrollbarTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* 注入滚动条样式 */}
      <style>{scrollbarStyles}</style>

      {/* 滚动容器 */}
      <div
        ref={scrollContainerRef}
        className={`relative overflow-auto scroll-smooth ${horizontal ? 'whitespace-nowrap' : ''}`}
        style={{
          scrollSnapType: horizontal ? 'x mandatory' : 'y mandatory',
          WebkitOverflowScrolling: 'touch', // 启用移动端弹性滚动
        }}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div className={`${horizontal ? 'inline-flex' : ''}`}>
          {children}
        </div>

        {/* 滚动进度指示器 */}
        <div
          className={`fixed top-0 left-0 right-0 h-1 bg-blue-600 transition-opacity duration-300 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: 'left' }}
        />
      </div>
    </>
  );
};

// 滚动区块组件
const ScrollSection = ({ children, className = '' }) => {
  return (
    <div
      className={`scroll-snap-align: start ${className}`}
      style={{
        scrollSnapAlign: 'start',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export { AdvancedScroll, ScrollSection };