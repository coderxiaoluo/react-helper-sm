import React, { useState, useEffect, useRef, useCallback } from 'react';

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const carouselRef = useRef(null);
  const slideRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const startTranslate = useRef(0);

  // 轮播图片数据 - 使用本地public资源
  const images = [
    { src: '/images/b1.jpg', alt: '轮播图片1' },
    { src: '/images/b2.jpg', alt: '轮播图片2' },
    { src: '/images/b3.jpg', alt: '轮播图片3' },
    { src: '/images/b4.jpg', alt: '轮播图片4' },
    { src: '/images/b5.jpg', alt: '轮播图片5' },
    { src: '/images/b6.jpg', alt: '轮播图片6' },
    { src: '/images/b7.jpg', alt: '轮播图片7' }
  ];

  // 从localStorage获取缓存的图片加载状态
  useEffect(() => {
    try {
      const cachedStatus = localStorage.getItem('customCarouselImageStatus');
      if (cachedStatus) {
        setImageLoadStatus(JSON.parse(cachedStatus));
      }
    } catch (error) {
      console.error('Failed to parse cached image status:', error);
      // 清除损坏的缓存
      localStorage.removeItem('customCarouselImageStatus');
    }
  }, []);

  // 缓存图片加载状态到localStorage，限制缓存大小
  useEffect(() => {
    try {
      // 只缓存已加载成功的图片状态，减少缓存大小
      const filteredStatus = Object.fromEntries(
        Object.entries(imageLoadStatus).filter(([_, status]) => status === 'loaded')
      );
      localStorage.setItem('customCarouselImageStatus', JSON.stringify(filteredStatus));
    } catch (error) {
      console.error('Failed to cache image status:', error);
    }
  }, [imageLoadStatus]);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // 轮播切换时更新translate
  useEffect(() => {
    if (carouselRef.current) {
      // 使用requestAnimationFrame优化轮播切换动画
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const slideWidth = carouselRef.current.offsetWidth;
        const newTranslate = -currentIndex * slideWidth;
        setCurrentTranslate(newTranslate);
      });
    }
  }, [currentIndex]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 图片加载成功处理
  const handleImageLoad = useCallback((index) => {
    setImageLoadStatus(prev => ({ ...prev, [index]: 'loaded' }));
  }, []);

  // 图片加载错误处理
  const handleImageError = useCallback((index) => {
    setImageLoadStatus(prev => ({ ...prev, [index]: 'error' }));
  }, []);

  // 触摸开始
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    startTranslate.current = currentTranslate;
    setStartX(e.touches[0].clientX);
  }, [currentTranslate]);

  // 触摸移动
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;

    // 使用requestAnimationFrame优化触摸滑动
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const currentX = e.touches[0].clientX;
      const newTranslate = startTranslate.current + (currentX - startX);
      setCurrentTranslate(newTranslate);
    });
  }, [isDragging, startX, startTranslate]);

  // 触摸结束
  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    // 取消未完成的动画帧
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const threshold = 50;
    if (Math.abs(currentTranslate) > threshold) {
      // 向右滑动
      if (currentTranslate > 0) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      }
      // 向左滑动
      else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }
    // 重置translate
    setCurrentTranslate(0);
  }, [isDragging, currentTranslate, images.length]);

  // 点击指示器
  const handleIndicatorClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* 轮播容器 */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden"
      >
        {/* 轮播轨道 */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${isDragging ? currentTranslate : -currentIndex * 100}%)`,
            willChange: 'transform'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 轮播图片 */}
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (slideRefs.current[index] = el)}
              className="flex-shrink-0 w-full relative"
              style={{ paddingBottom: '56.25%' }} // 16:9 比例
            >
              {/* 加载占位图 */}
              <div
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 bg-[#F5F2EB] flex items-center justify-center ${imageLoadStatus[index] === 'loaded' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
              >
                {/* 加载动画 */}
                <div className="w-6 h-6 border-3 border-[#2C4B5E] border-t-transparent rounded-full animate-spin"></div>
              </div>

              {/* 实际图片 */}
              <img
                src={image.src}
                alt={image.alt}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoadStatus[index] === 'loaded' ? 'opacity-100' : 'opacity-0'
                  }`}
                style={{ willChange: 'opacity' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 圆点指示器 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${index === currentIndex ? 'bg-[#2C4B5E] w-6' : 'bg-white bg-opacity-50'
              }`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;