import React, { useState, useEffect, useRef } from 'react';

const SplashVideo = ({ onComplete, videoPath = '/video/splash.mp4', coverPath = '/images/splash/splash_cover.jpg' }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // 组件挂载时初始化
  useEffect(() => {
    // 尝试播放视频
    if (videoRef.current) {
      playVideo();
    }
  }, []);

  // 视频加载完成处理
  const handleVideoLoadedData = () => {
    setVideoLoaded(true);
    // 视频加载完成后隐藏封面
    setTimeout(() => {
      setShowCover(false);
    }, 100);
  };

  // 视频开始播放处理
  const handleVideoPlay = () => {
    setVideoPlaying(true);
  };

  // 视频播放结束处理
  const handleVideoEnded = () => {
    setVideoEnded(true);
    // 视频播放结束后调用完成回调
    if (onComplete) {
      onComplete();
    }
  };

  // 视频加载错误处理
  const handleVideoError = () => {
    console.error('Video loading failed');
    // 视频加载失败时，直接调用完成回调
    if (onComplete) {
      onComplete();
    }
  };

  // 尝试播放视频
  const playVideo = async () => {
    if (!videoRef.current) return;

    try {
      // 设置静音，满足自动播放规则
      videoRef.current.muted = true;
      // 尝试播放
      await videoRef.current.play();
      setVideoPlaying(true);
    } catch (error) {
      console.error('Error playing video:', error);
      // 播放失败时，尝试在用户交互后播放
      setupUserInteractionPlay();
    }
  };

  // 设置用户交互后播放
  const setupUserInteractionPlay = () => {
    const handleUserInteraction = () => {
      playVideo();
      // 移除事件监听器
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // 添加事件监听器
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    // 清理函数
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  };

  // 跳过按钮点击处理
  const handleSkip = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // 如果视频已结束，不渲染组件
  if (videoEnded) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* 封面兜底 - 彻底消除黑屏 */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${showCover ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <img
          src={coverPath}
          alt="Splash Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 开屏视频 */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={coverPath}
        onLoadedData={handleVideoLoadedData}
        onPlay={handleVideoPlay}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
        style={{ display: 'block' }}
      >
        <source src={videoPath} type="video/mp4" />
        {/* 降级处理 */}
        Your browser does not support the video tag.
      </video>

      {/* 加载动画 */}
      {!videoLoaded && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* 跳过按钮 */}
      <button
        onClick={handleSkip}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-300"
      >
        跳过
      </button>
    </div>
  );
};

export default SplashVideo;