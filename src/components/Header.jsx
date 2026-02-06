import React, { useState, useEffect } from 'react';
import { Sword, Play, Pause, Music, Loader2 } from 'lucide-react';
import musicPlayer from '../services/MusicPlayer';

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载字体
    const loadFonts = () => {
      // 瘦金体字体
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap';
      document.head.appendChild(link);

      // 行书字体
      const link2 = document.createElement('link');
      link2.rel = 'stylesheet';
      link2.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500&display=swap';
      document.head.appendChild(link2);
    };

    loadFonts();

    // 初始化音乐播放器
    musicPlayer.init();

    // 同步播放状态
    setIsPlaying(musicPlayer.getIsPlaying());
    setLoading(musicPlayer.getLoading());

    // 定期同步状态（避免页面跳转后状态不同步）
    const statusInterval = setInterval(() => {
      setIsPlaying(musicPlayer.getIsPlaying());
      setLoading(musicPlayer.getLoading());
    }, 100);

    // 组件卸载时清理
    return () => {
      clearInterval(statusInterval);
    };
  }, []);

  const togglePlay = () => {
    musicPlayer.togglePlay();
    setIsPlaying(musicPlayer.getIsPlaying());
  };

  return (
    <header className="py-6 rounded-2xl mb-4 relative overflow-hidden shadow-lg shadow-black/40 bg-[#1A1A2E]">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#16213E] to-[#0F3460] opacity-90"></div>

      {/* 内容 */}
      <div className="max-w-[396px] mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* 标题 */}
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Sword className="h-10 w-6 text-[#E94560]" />
            <h1 className="text-2xl font-bold text-white font-wuxia">
              逆水寒手游竞技爱好者
            </h1>
          </div>

          {/* 副标题和音乐控制 */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
            <p className="text-base text-[#A0AEC0]" style={{ fontFamily: '"Noto Serif SC", serif' }}>
              武林盟主.碎梦 | 所有江湖偶遇,都是宿命相逢
            </p>
            <button
              onClick={togglePlay}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 text-white"
              aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
              disabled={loading}
            >
              <Music className="h-4 w-4" />
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
