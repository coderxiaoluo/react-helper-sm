import React, { useState, useEffect, useRef } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef(null);

  // 显示跳过按钮
  useEffect(() => {
    // 立即显示跳过按钮，不再等待
    setShowSkip(true);
  }, []);

  // 控制开屏时间
  useEffect(() => {
    // 固定开屏时间为3秒，避免视频加载慢导致长时间停留
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* 开屏视频 - 直接播放，不等待加载完成 */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{ display: 'block' }}
      >
        <source src="/smvideo.mp4" type="video/mp4" />
      </video>

      {/* 半透明黑色覆盖层，增强文字可读性 */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* 开屏文字 - 立即显示，不等待视频加载 */}
      <div className="relative z-10 text-white text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">刀斩不义慑鬼神</h1>
        <p className="text-base md:text-lg drop-shadow-md">武林盟主.碎梦 | 欢迎加入</p>
      </div>

      {/* 跳过按钮 */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-300"
        >
          跳过
        </button>
      )}
    </div>
  );
};

export default SplashScreen;