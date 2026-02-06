import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      text: '帮会展示',
      href: '/guilds',
      gradient: 'linear-gradient(135deg, #c8d8e8, #a0b8d0)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 22h16" />
          <path d="M6 12l6-6 6 6" />
          <path d="M6 18l6-6 6 6" />
        </svg>
      ),
      text: '帮战微信接龙筛选',
      href: '/wechat-chain',
      gradient: 'linear-gradient(135deg, #d8c8b8, #b09880)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
      text: '联赛数据分析',
      href: '/league',
      gradient: 'linear-gradient(135deg, #c8d8c8, #a0b8a0)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      text: '微信帮会成员筛选',
      href: '/members',
      gradient: 'linear-gradient(135deg, #d8c8d8, #b098b0)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      text: '插旗/首席内功收益计算',
      href: '/flag',
      gradient: 'linear-gradient(135deg, #d8d8c8, #b0b098)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      text: 'pvp防守团内功收益计算',
      href: '/defense',
      gradient: 'linear-gradient(135deg, #c8e8d8, #a0d0b8)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      text: 'pvp面板收益计算',
      href: '/panel',
      gradient: 'linear-gradient(135deg, #e8d8c8, #d0b8a0)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      text: '通用内功选择对比计算',
      href: '/skills',
      gradient: 'linear-gradient(135deg, #e8c8d8, #d0a0b8)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
      ),
      text: '内功收益计算器',
      href: '/neigong-calculator',
      gradient: 'linear-gradient(135deg, #c8e8e8, #a0d0d0)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
      text: '成员匹配指南',
      href: '/member-match-guide',
      gradient: 'linear-gradient(135deg, #d8e8c8, #b0d0a0)'
    }
  ];

  const handleNavigation = (href, external) => {
    if (external) {
      window.open(href, '_blank');
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes inkFlow {
            0% {
              background-position: 0% 0%, 50% 50%;
            }
            50% {
              background-position: 100% 100%, 0% 0%;
            }
            100% {
              background-position: 0% 0%, 50% 50%;
            }
          }
        `}
      </style>
      <nav style={{
        position: 'relative',
        padding: '30px 0 60px',
        background: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDEwMHYxMDBIMHoiLz48L3N2Zz4=') #3E3E3E, radial-gradient(rgba(0,0,0,0.2), transparent)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        fontFamily: "'Ma Shan Zheng', 'STHeiti', serif",
        animation: 'inkFlow 20s ease-in-out infinite'
      }}>
        {/* 顶部伪元素倒三角 */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '20px solid #3E3E3E',
          zIndex: 2
        }}></div>
        {/* 顶部逆水寒水墨插画 */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '120px',
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjEiIGQ9Ik0wIDBoMTAwdjUwaC0xMDB6IiBmaWxsPSIjMDAwIi8+PC9zdmc+')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}></div>

        <div className="relative z-10" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
          <div className="navigation-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%' }}>
            {navItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="navigation-item"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjEiIGQ9Ik0zMCAzMGMtNi42MiAwLTEyLTUuMzgtMTItMTIzMCA2LjYyIDAgMTIgNS4zOCAxMiAxMnptMCAzMGMtNi42MiAwLTEyLTUuMzgtMTItMTIzMCA2LjYyIDAgMTIgNS4zOCAxMiAxMnptLTMwIDBjLTYuNjIgMC0xMi01LjM4LTEyLTEyIDAgNi42MiA1LjM4IDEyIDEyIDEyIDYuNjIgMCAxMi01LjM4IDEyLTEyIDAtNi42Mi01LjM4LTEyLTEyLTEyeiIvPjwvZz48L3N2Zz4=') linear-gradient(135deg, #B5834C, #D4AF37)`,
                    borderRadius: '16px 8px 16px 8px',
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)',
                    border: '1px solid #B5834C',
                    boxShadow: '0 4px 8px rgba(26, 26, 26, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer',
                    padding: '16px 16px',
                    minHeight: '70px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    // Hover效果：发光+上浮
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    // 恢复默认状态
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(26, 26, 26, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={(e) => {
                    // 点击效果：玉佩轻颤动画
                    e.currentTarget.style.transform = 'translateY(-3px) scale(0.98)';
                    setTimeout(() => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }, 150);
                    handleNavigation(item.href, item.external);
                  }}
                >
                  {/* 铜钉边框 */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}></div>

                  {/* 图标 */}
                  <div
                    style={{
                      color: '#D4AF37',
                      marginBottom: '8px',
                      flexShrink: 0,
                      filter: 'drop-shadow(0 0 2px rgba(212, 175, 55, 0.4))',
                      position: 'relative',
                      zIndex: 3
                    }}
                  >
                    {item.icon}
                  </div>
                  {/* 文字 */}
                  <span
                    style={{
                      color: '#D4AF37',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      fontFamily: "'Wei Bei', 'STKaiti', serif",
                      whiteSpace: 'normal',
                      overflow: 'visible',
                      textOverflow: 'clip',
                      maxWidth: '180px',
                      position: 'relative',
                      zIndex: 3,
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
          {/* 样式已内联到元素中，不再需要单独的style标签 */}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
