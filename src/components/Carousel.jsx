import React, { useState, useEffect, useRef } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const carouselRef = useRef(null);

  // 轮播图片数据
  const images = [
    {
      src: 'https://youke.xn--y7xa690gmna.cn/s1/2026/02/02/697fef3d3e035.webp',
      alt: '轮播图片1'
    },
    {
      src: 'https://youke.xn--y7xa690gmna.cn/s1/2026/02/02/697fef4188e9f.webp',
      alt: '轮播图片2'
    },
    {
      src: 'https://youke.xn--y7xa690gmna.cn/s1/2026/02/02/697fef4c7549a.webp',
      alt: '轮播图片3'
    },
    {
      src: 'https://youke.xn--y7xa690gmna.cn/s1/2026/02/02/697fef575a420.webp',
      alt: '轮播图片4'
    },
    {
      src: 'https://youke.xn--y7xa690gmna.cn/s1/2026/02/02/697fef5965f5f.webp',
      alt: '轮播图片5'
    },
    {
      src: 'https://youke.xn--y7xa690gmna.cn/s1/2026/02/02/697fef48146a7.webp',
      alt: '轮播图片6'
    },
    {
      src: 'https://youke.xn--y7xa690gmna.cn/s1/2026/02/02/697fef5f1381e.webp',
      alt: '轮播图片7'
    }
  ];

  // 预加载当前和相邻图片
  useEffect(() => {
    // 只在currentIndex或images.length变化时更新，避免依赖loadedImages导致的无限循环
    const newLoaded = new Set();
    // 加载当前图片
    newLoaded.add(currentIndex);
    // 加载前一张图片
    newLoaded.add((currentIndex - 1 + images.length) % images.length);
    // 加载后一张图片
    newLoaded.add((currentIndex + 1) % images.length);
    setLoadedImages(newLoaded);
  }, [currentIndex, images.length]);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 增加轮播间隔时间到5秒

    return () => clearInterval(interval);
  }, [images.length]);

  // 触摸开始
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // 触摸移动
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // 触摸结束
  const handleTouchEnd = () => {
    if (touchEnd - touchStart > 50) {
      // 向右滑动
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    } else if (touchStart - touchEnd > 50) {
      // 向左滑动
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  // 点击指示器
  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  // 图片加载状态
  const [imageLoadStatus, setImageLoadStatus] = useState({});

  const handleImageLoad = (index) => {
    setImageLoadStatus(prev => ({ ...prev, [index]: 'loaded' }));
  };

  const handleImageError = (index) => {
    setImageLoadStatus(prev => ({ ...prev, [index]: 'error' }));
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* 轮播容器 */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 轮播图片 */}
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 比例 */}
            {/* 加载占位图 */}
            <div className={`absolute inset-0 w-full h-full ${imageLoadStatus[index] === 'loaded' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 bg-[#F5F2EB] flex items-center justify-center`}>
              <div className="w-8 h-8 border-4 border-[#2C4B5E] border-t-transparent rounded-full animate-spin"></div>
            </div>

            {/* 实际图片 */}
            {loadedImages.has(index) && (
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoadStatus[index] === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
              />
            )}

            {/* 图片加载错误提示 */}
            {imageLoadStatus[index] === 'error' && (
              <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">图片加载失败</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 圆点指示器 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#2C4B5E] w-6' : 'bg-white bg-opacity-50'}`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;