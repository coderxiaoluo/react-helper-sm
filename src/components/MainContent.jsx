import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, GridItem } from 'react-vant';
import { Users, BarChart3, FileText, Sword, Shield, Target, Calculator, Zap, BookOpen, Users as UsersIcon } from 'lucide-react';
import Introduction from './Introduction';
import ViewportAnimated from './ViewportAnimated';
import './AncientStyle.css'; // 古风样式模块

const MainContent = () => {
  const navigate = useNavigate();

  // 功能卡片数据配置
  const features = [
    {
      title: '帮战微信接龙筛选',
      description: '帮战接龙职业统计、方便统战做表',
      icon: Users,
      color: 'ancient-theme-blue',
      route: '/wechat-chain', // 内部路由
      isExternal: false
    },
    {
      title: '联赛数据分析',
      description: '方便数据横向、竖向对比',
      icon: BarChart3,
      color: 'ancient-theme-green',
      route: '/league', // 内部路由
      isExternal: false
    },
    {
      title: '微信帮会成员筛选',
      description: '方便筛选出群和帮会帮战人员',
      icon: FileText,
      color: 'ancient-theme-purple',
      route: '/members', // 内部路由
      isExternal: false
    },
    {
      title: '插旗/首席内功收益计算',
      description: '专门给喜欢单挑的人',
      icon: Sword,
      color: 'ancient-theme-red',
      route: '/flag', // 内部路由
      isExternal: false
    },
    {
      title: 'pvp防守团内功收益计算',
      description: '专门给喜欢帮战的人',
      icon: Shield,
      color: 'ancient-theme-orange',
      route: '/defense', // 内部路由
      isExternal: false
    },
    {
      title: 'pvp面板收益计算',
      description: '自己面板最真实的收益',
      icon: Target,
      color: 'ancient-theme-yellow',
      route: '/panel', // 内部路由
      isExternal: false
    },
    {
      title: '通用内功选择对比计算',
      description: '方便对比和DIY适合自己的内功收益',
      icon: Calculator,
      color: 'ancient-theme-indigo',
      route: '/skills', // 内部路由
      isExternal: false
    },
    {
      title: '内功收益计算器',
      description: '专业的内功属性收益分析工具',
      icon: Zap,
      color: 'ancient-theme-pink',
      route: '/neigong-calculator', // 内部路由
      isExternal: false
    },
    {
      title: '成员匹配指南',
      description: '帮助帮会管理者快速识别成员状态',
      icon: BookOpen,
      color: 'ancient-theme-teal',
      route: '/member-match-guide', // 内部路由
      isExternal: false
    },
    {
      title: '帮会成员功能',
      description: '微信帮会成员筛选和管理',
      icon: UsersIcon,
      color: 'ancient-theme-blue',
      route: '/members', // 内部路由
      isExternal: false
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

      {/* 古风2列网格布局 */}
      <div className="mt-8 ancient-grid-container">
        <Grid
          square
          columns={2}
          border={false}
          gap={24}
          className="w-full ancient-grid"
        >
          {features.map((feature, index) => (
            <ViewportAnimated
              key={index}
              delay={index * 100}
              threshold={0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
              className="w-full"
            >
              <GridItem
                onClick={() => handleCardClick(feature.route, feature.isExternal)}
                className={`ancient-card cursor-pointer ${feature.color}`}
                style={{
                  height: '200px',
                  minHeight: '200px',
                  maxHeight: '200px',
                  width: '100%',
                  clipPath: 'none'
                }}
              >
                <div className="ancient-card-content">
                  <div className="ancient-icon">
                    <feature.icon className="h-10 w-10 text-[#8B4513]" />
                  </div>
                  <h3 className="ancient-title">
                    {feature.title}
                  </h3>
                  <p className="ancient-desc">
                    {feature.description}
                  </p>
                </div>
              </GridItem>
            </ViewportAnimated>
          ))}
        </Grid>
      </div>
    </main>
  );
};

export default MainContent;
