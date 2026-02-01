import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // 0.5秒后显示跳过按钮
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 500);

    // 1.5秒后自动完成开屏
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* 开屏视频容器 */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <video
          className="w-full h-full object-cover"
          src="/smvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={(e) => {
            // 视频加载失败时隐藏视频元素
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* 半透明黑色覆盖层，增强文字可读性 */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* 开屏文字 */}
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