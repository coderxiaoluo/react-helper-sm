import React, { useState, useEffect, useRef, useCallback } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  const [retryCount, setRetryCount] = useState({});
  const carouselRef = useRef(null);
  const observerRef = useRef(null);

  // 轮播图片数据 - 使用本地public资源
  const images = [
    {
      src: '/images/b1.jpg',
      alt: '轮播图片1'
    },
    {
      src: '/images/b2.jpg',
      alt: '轮播图片2'
    },
    {
      src: '/images/b3.jpg',
      alt: '轮播图片3'
    },
    {
      src: '/images/b4.jpg',
      alt: '轮播图片4'
    },
    {
      src: '/images/b5.jpg',
      alt: '轮播图片5'
    },
    {
      src: '/images/b6.jpg',
      alt: '轮播图片6'
    },
    {
      src: '/images/b7.jpg',
      alt: '轮播图片7'
    }
  ];

  // 从localStorage获取缓存的图片加载状态
  useEffect(() => {
    const cachedStatus = localStorage.getItem('carouselImageStatus');
    if (cachedStatus) {
      try {
        setImageLoadStatus(JSON.parse(cachedStatus));
      } catch (error) {
        console.error('Failed to parse cached image status:', error);
      }
    }
  }, []);

  // 缓存图片加载状态到localStorage
  useEffect(() => {
    localStorage.setItem('carouselImageStatus', JSON.stringify(imageLoadStatus));
  }, [imageLoadStatus]);

  // 优化的预加载策略：加载当前、前两张和后两张图片
  useEffect(() => {
    const newLoaded = new Set();
    const length = images.length;

    // 加载当前图片
    newLoaded.add(currentIndex);
    // 加载前两张图片
    newLoaded.add((currentIndex - 1 + length) % length);
    newLoaded.add((currentIndex - 2 + length) % length);
    // 加载后两张图片
    newLoaded.add((currentIndex + 1) % length);
    newLoaded.add((currentIndex + 2) % length);

    setLoadedImages(newLoaded);
  }, [currentIndex, images.length]);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 保持5秒轮播间隔

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

  // 图片加载成功处理
  const handleImageLoad = useCallback((index) => {
    setImageLoadStatus(prev => ({ ...prev, [index]: 'loaded' }));
  }, []);

  // 图片加载失败处理（带重试机制）
  const handleImageError = useCallback((index) => {
    setImageLoadStatus(prev => ({ ...prev, [index]: 'error' }));

    // 自动重试加载失败的图片（最多重试2次）
    const currentRetry = retryCount[index] || 0;
    if (currentRetry < 2) {
      setRetryCount(prev => ({ ...prev, [index]: currentRetry + 1 }));

      // 延迟1秒后重试
      setTimeout(() => {
        setImageLoadStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[index];
          return newStatus;
        });
      }, 1000);
    }
  }, [retryCount]);

  // 使用Intersection Observer监测图片进入视口
  useEffect(() => {
    if ('IntersectionObserver' in window && carouselRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const imgElement = entry.target.querySelector('img');
              if (imgElement && imgElement.dataset.src) {
                imgElement.src = imgElement.dataset.src;
                imgElement.removeAttribute('data-src');
              }
            }
          });
        },
        {
          root: carouselRef.current,
          rootMargin: '200px', // 提前200px开始加载
          threshold: 0.1
        }
      );

      // 观察所有轮播项
      const slideElements = carouselRef.current.querySelectorAll('.carousel-slide');
      slideElements.forEach((slide) => {
        observerRef.current.observe(slide);
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* 轮播容器 */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          willChange: 'transform' // 提示浏览器优化动画
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 轮播图片 */}
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-slide flex-shrink-0 w-full relative"
            style={{ paddingBottom: '56.25%' }} // 16:9 比例
          >
            {/* 加载占位图 */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-300 bg-[#F5F2EB] flex items-center justify-center ${imageLoadStatus[index] === 'loaded' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
              <div className="w-8 h-8 border-4 border-[#2C4B5E] border-t-transparent rounded-full animate-spin"></div>
            </div>

            {/* 实际图片 */}
            {loadedImages.has(index) && (
              <img
                data-src={image.src} // 用于Intersection Observer延迟加载
                src={imageLoadStatus[index] === 'loaded' ? image.src : ''}
                alt={image.alt}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoadStatus[index] === 'loaded' ? 'opacity-100' : 'opacity-0'
                  }`}
                style={{ willChange: 'opacity' }} // 提示浏览器优化动画
              />
            )}

            {/* 图片加载错误提示 - 移除错误文字显示 */}
            {imageLoadStatus[index] === 'error' && (
              <div className="absolute inset-0 w-full h-full bg-[#F5F2EB] flex items-center justify-center">
                {/* 保持与加载中相同的背景，不显示错误文字 */}
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
            className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${index === currentIndex ? 'bg-[#2C4B5E] w-6' : 'bg-white bg-opacity-50'}`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{ willChange: 'width, background-color' }} // 提示浏览器优化动画
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;