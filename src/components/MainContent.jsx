import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import Introduction from './Introduction';

const MainContent = () => {
  const navigate = useNavigate();

  // 功能卡片数据配置
  const features = [
    {
      title: '帮战微信接龙筛选',
      description: '帮战接龙职业统计、方便统战做表',
      icon: '👥',
      color: 'bg-blue-50 border-blue-200',
      route: '/wechat-chain', // 内部路由
      isExternal: false
    },
    {
      title: '联赛数据分析',
      description: '方便数据横向、竖向对比',
      icon: '📊',
      color: 'bg-green-50 border-green-200',
      route: '/league', // 内部路由
      isExternal: false
    },
    {
      title: '微信帮会成员筛选',
      description: '方便筛选出群和帮会帮战人员',
      icon: '📝',
      color: 'bg-purple-50 border-purple-200',
      route: '/members', // 内部路由
      isExternal: false
    },
    {
      title: '插旗/首席内功收益计算',
      description: '专门给喜欢单挑的人',
      icon: '⚔️',
      color: 'bg-red-50 border-red-200',
      route: '/flag', // 内部路由
      isExternal: false
    },
    {
      title: 'pvp防守团内功收益计算',
      description: '专门给喜欢帮战的人',
      icon: '🛡️',
      color: 'bg-orange-50 border-orange-200',
      route: '/defense', // 内部路由
      isExternal: false
    },
    {
      title: 'pvp面板收益计算',
      description: '自己面板最真实的收益',
      icon: '🏹',
      color: 'bg-yellow-50 border-yellow-200',
      route: '/panel', // 内部路由
      isExternal: false
    },
    {
      title: '通用内功选择对比计算',
      description: '方便对比和DIY适合自己的内功收益',
      icon: '🧮',
      color: 'bg-indigo-50 border-indigo-200',
      route: '/skills', // 内部路由
      isExternal: false
    },
    {
      title: '内功收益计算器',
      description: '专业的内功属性收益分析工具',
      icon: '⚡',
      color: 'bg-pink-50 border-pink-200',
      route: '/neigong-calculator', // 内部路由
      isExternal: false
    },
    {
      title: '成员匹配指南',
      description: '帮助帮会管理者快速识别成员状态',
      icon: '📚',
      color: 'bg-teal-50 border-teal-200',
      route: '/member-match-guide', // 内部路由
      isExternal: false
    },
    {
      title: '留言板',
      description: '方便使用者留言和建议',
      icon: '📨',
      color: 'bg-pink-50 border-pink-200',
      route: 'https://chat.nestboy.com/kefu.html', // 外部链接
      isExternal: true
    }
  ];

  // 处理卡片点击事件
  const handleCardClick = (route, isExternal) => {
    if (isExternal) {
      // 外部链接在新标签页打开
      window.open(route, '_blank');
    } else {
      // 内部路由使用navigate跳转
      navigate(route);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Introduction />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(feature.route, feature.isExternal)}
            className="cursor-pointer"
          >
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
