import React, { useState, useEffect, useRef } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  // 轮播图片数据
  const images = [
    {
      src: '/bgcsm02.jpg',
      alt: '碎梦武侠风格图片1'
    },
    {
      src: '/bgcsm01.jpg',
      alt: '碎梦武侠风格图片2'
    }
  ];

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
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* 圆点指示器 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-blue-600 w-6' : 'bg-white bg-opacity-50'}`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;