import React, { useState, useRef, useEffect } from 'react';
import { Sword, Play, Pause, Music } from 'lucide-react';

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 组件挂载时创建音频元素
    audioRef.current = new Audio('/music/明月天涯 - 五音Jw.mp3');
    audioRef.current.loop = true;

    // 尝试自动播放音乐
    const playMusic = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('自动播放被阻止，需要用户交互后才能播放音乐:', error);
      }
    };

    playMusic();

    // 组件卸载时清理音频元素
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <header className="py-3 rounded-lg mb-2 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bgcimage/bj2.jpg')" }}>
      {/* 半透明覆盖层，淡化背景 */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* 内容 */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* 标题 */}
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Sword className="h-8 w-8 text-white drop-shadow-lg" />
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              逆水寒手游竞技爱好者
            </h1>
          </div>

          {/* 副标题和音乐控制 */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-base text-white opacity-90 drop-shadow">
              武林盟主.碎梦 | 所有江湖偶遇,都是宿命相逢
            </p>
            <button
              onClick={togglePlay}
              className="flex items-center space-x-1 px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-300 text-white"
              aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
            >
              <Music className="h-3 w-3" />
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
