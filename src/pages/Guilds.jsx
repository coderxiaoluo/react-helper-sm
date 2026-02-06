import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import guildsData from '../data/guilds.json';

const Guilds = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [guilds, setGuilds] = useState([]);
  const contentRef = useRef(null);
  const startYRef = useRef(0);

  // 初始化帮会数据
  useEffect(() => {
    setGuilds(guildsData.guilds);

    // 动态引入书法字体
    const loadFont = () => {
      const link1 = document.createElement('link');
      link1.rel = 'stylesheet';
      link1.href = 'https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap';
      document.head.appendChild(link1);

      const link2 = document.createElement('link');
      link2.rel = 'stylesheet';
      link2.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap';
      document.head.appendChild(link2);
    };

    loadFont();
  }, []);

  // 处理帮会项点击事件
  const handleGuildClick = (guildId) => {
    navigate(`/guild/${guildId}`);
  };

  // 模拟刷新数据
  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    // 模拟网络请求，减少时间以提高响应速度
    setTimeout(() => {
      // 随机打乱帮会顺序
      const shuffledGuilds = [...guildsData.guilds].sort(() => Math.random() - 0.5);
      setGuilds(shuffledGuilds);
      setIsRefreshing(false);
      setPullDistance(0);
      setIsPulling(false);
    }, 800); // 减少到800ms，提高响应速度
  }, []);

  // 触摸开始事件
  const handleTouchStart = useCallback((e) => {
    // 检测是否在页面顶部
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop <= 10) { // 增加阈值，提高触发概率
      startYRef.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  // 触摸移动事件
  const handleTouchMove = useCallback((e) => {
    if (!isPulling || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startYRef.current;

    if (distance > 0) {
      // 限制下拉距离
      const limitedDistance = Math.min(distance * 0.6, 80); // 增加系数，提高下拉速度感
      setPullDistance(limitedDistance);
    }
  }, [isPulling, isRefreshing]);

  // 触摸结束事件
  const handleTouchEnd = useCallback(() => {
    if (isPulling && pullDistance > 30) { // 降低阈值，提高触发概率
      refreshData();
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
  }, [isPulling, pullDistance, refreshData]);

  return (
    <>
      <style>
        {`
          /* 文字基础样式 */
          .guild-name {
            color: #2D2327;
            display: inline-block;
            position: relative;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          }
          
          /* 扫光效果 */
          .guild-name.animate-shine::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 60%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            pointer-events: none;
            animation: shine 3s linear infinite;
          }
          
          /* 扫光动画 */
          @keyframes shine {
            0% {
              background-position: 100%;
            }
            100% {
              background-position: -100%;
            }
          }
        `}
      </style>
      <div
        className="min-h-screen animate-ink-blur"
        style={{
          background: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjEiIGQ9Ik0zMCAzMGMtNi42MiAwLTEyLTUuMzgtMTItMTIzMCA2LjYyIDAgMTIgNS4zOCAxMiAxMnptMCAzMGMtNi42MiAwLTEyLTUuMzgtMTItMTIzMCA2LjYyIDAgMTIgNS4zOCAxMiAxMnptLTMwIDBjLTYuNjIgMC0xMi01LjM4LTEyLTEyIDAgNi42MiA1LjM4IDEyIDEyIDEyIDYuNjIgMCAxMi01LjM4IDEyLTEyIDAtNi42Mi01LjM4LTEyLTEyLTEyeiIvPjwvZz48L3N2Zz4=') #F2E8D6`,
          backgroundImage: `radial-gradient(circle at top left, rgba(45,35,39,0.05), transparent 60%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          position: 'relative',
          overflow: 'hidden'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 下拉刷新指示器 */}
        {pullDistance > 0 && (
          <div
            className="flex justify-center items-center py-3 transition-all duration-300 relative z-10"
            style={{ transform: `translateY(${pullDistance - 40}px)` }}
          >
            <div className="flex flex-col items-center">
              <svg
                className={`w-8 h-8 text-bronze transition-transform duration-300 ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-base text-bronze mt-2 font-wuxia">
                {isRefreshing ? '刷新中...' : '下拉刷新'}
              </span>
            </div>
          </div>
        )}

        <div
          ref={contentRef}
          className="min-h-screen px-4 py-8 overflow-auto relative z-1"
          style={{
            transform: isRefreshing ? 'translateY(40px)' : `translateY(${pullDistance}px)`,
            transition: isRefreshing ? 'transform 0.3s ease' : 'transform 0.1s ease'
          }}
        >
          <div className="max-w-[396px] mx-auto w-full">
            {/* 标题区域 */}
            <div className="relative mb-8 text-center py-4">
              <h1
                className="text-4xl font-bold text-center m-0 relative z-1"
                style={{ letterSpacing: '3px', color: '#2D2327', fontFamily: "'Ma Shan Zheng', 'STKaiti', serif", textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
              >
                帮会展示
              </h1>
            </div>

            {/* 网格布局 */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {guilds.map((guild, index) => (
                <div
                  key={guild.id}
                  className="flex flex-col items-center justify-center rounded-lg p-5 min-h-[100px] relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group"
                  style={{
                    background: 'linear-gradient(135deg, #E8DED2, #F0E6D2)',
                    backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjEiIGQ9Ik0zMCAzMGMtNi42MiAwLTEyLTUuMzgtMTItMTIzMCA2LjYyIDAgMTIgNS4zOCAxMiAxMnptMCAzMGMtNi42MiAwLTEyLTUuMzgtMTItMTIzMCA2LjYyIDAgMTIgNS4zOCAxMiAxMnptLTMwIDBjLTYuNjIgMC0xMi01LjM4LTEyLTEyIDAgNi42MiA1LjM4IDEyIDEyIDEyIDYuNjIgMCAxMi01LjM4IDEyLTEyIDAtNi42Mi01LjM4LTEyLTEyLTEyeiIvPjwvZz48L3N2Zz4=')`,
                    backgroundSize: '200px',
                    backgroundBlendMode: 'overlay',
                    border: '1px solid #D4C2A8',
                    boxShadow: '0 2px 4px rgba(92,64,51,0.1)'
                  }}
                  onClick={() => handleGuildClick(guild.id)}
                >
                  {/* 云纹装饰 */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                      <path d="M20 50C20 30 40 10 60 10C80 10 90 30 90 50C90 70 70 90 50 90C30 90 10 70 10 50C10 30 20 30 20 50Z" fill="currentColor" />
                    </svg>
                  </div>

                  {/* 帮会名称 */}
                  <h2
                    className="text-lg leading-relaxed font-wuxia text-center m-0 max-w-full relative z-1 guild-name animate-shine"
                    style={{ lineHeight: '1.5' }}
                    data-text={guild.name}
                  >
                    {guild.name}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Guilds);