import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Swipe, SwipeItem } from 'react-vant';

const OptimizedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0, 1, 2]));
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  const [retryCount, setRetryCount] = useState({});
  const swipeRef = useRef(null);

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
      const cachedStatus = localStorage.getItem('optimizedCarouselImageStatus');
      if (cachedStatus) {
        setImageLoadStatus(JSON.parse(cachedStatus));
      }
    } catch (error) {
      console.error('Failed to parse cached image status:', error);
      // 清除损坏的缓存
      localStorage.removeItem('optimizedCarouselImageStatus');
    }
  }, []);

  // 缓存图片加载状态到localStorage，限制缓存大小
  useEffect(() => {
    try {
      // 只缓存已加载成功的图片状态，减少缓存大小
      const filteredStatus = Object.fromEntries(
        Object.entries(imageLoadStatus).filter(([_, status]) => status === 'loaded')
      );
      localStorage.setItem('optimizedCarouselImageStatus', JSON.stringify(filteredStatus));
    } catch (error) {
      console.error('Failed to cache image status:', error);
    }
  }, [imageLoadStatus]);

  // 加载所有图片
  useEffect(() => {
    // 延迟加载剩余图片
    const delayLoad = setTimeout(() => {
      const newLoaded = new Set(loadedImages);
      // 加载所有剩余图片
      for (let i = 0; i < images.length; i++) {
        newLoaded.add(i);
      }
      setLoadedImages(newLoaded);
    }, 500); // 短暂延迟后加载所有图片

    return () => clearTimeout(delayLoad);
  }, [loadedImages, images.length]);

  // 处理轮播切换事件
  const handleChange = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // 图片加载成功处理
  const handleImageLoad = useCallback((index) => {
    setImageLoadStatus(prev => ({ ...prev, [index]: 'loaded' }));
    // 加载成功后清除重试计数
    setRetryCount(prev => {
      const newRetry = { ...prev };
      delete newRetry[index];
      return newRetry;
    });
  }, []);

  // 图片加载错误处理（带重试机制）
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

  // 响应式处理：根据屏幕尺寸调整轮播图高度
  const [aspectRatio, setAspectRatio] = useState('56.25%'); // 默认16:9

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // 移动端使用更高的高度比例
        setAspectRatio('75%'); // 4:3
      } else {
        // 桌面端使用标准比例
        setAspectRatio('56.25%'); // 16:9
      }
    };

    // 初始设置
    handleResize();
    // 监听窗口 resize 事件
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100" ref={swipeRef}>
      <Swipe
        className="w-full"
        autoplay={5000}
        indicatorPosition="bottom"
        onChange={handleChange}
      >
        {images.map((image, index) => (
          <SwipeItem key={index} className="relative" style={{ paddingBottom: aspectRatio }}>
            {/* 加载占位图 - 带加载动画 */}
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
          </SwipeItem>
        ))}
      </Swipe>
    </div>
  );
};

export default OptimizedCarousel;