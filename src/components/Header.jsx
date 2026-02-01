import React, { useState, useRef, useEffect } from 'react';
import { Sword, Play, Pause, Music } from 'lucide-react';

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 组件挂载时创建音频元素
    audioRef.current = new Audio('/music/明月天涯 - 五音Jw.mp3');
    audioRef.current.loop = true;

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
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-6"> {/* 修改头部背景：从红色渐变改为蓝色渐变 */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3">
          <Sword className="h-8 w-8 text-white" /> {/* 修改图标颜色：确保在蓝色背景下清晰可见 */}
          <h1 className="text-2xl font-bold">逆水寒手游竞技爱好者</h1>
        </div>
        {/* 音乐地方 */}
        <div className="flex items-center justify-center mt-2 space-x-2">
          <p className="text-center text-blue-100 text-sm"> {/* 修改头部副标题颜色：从红色改为蓝色 */} {/* 调整文字大小：使其更加紧凑 */}
            武林盟主.碎梦 | 所有江湖偶遇,都是宿命相逢
          </p>
          <button
            onClick={togglePlay}
            className="flex items-center space-x-1 px-2 py-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
          >
            <Music className="h-4 w-4" />
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
