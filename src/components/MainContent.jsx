import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, GridItem } from 'react-vant';
import { Users, BarChart3, FileText, Sword, Shield, Target, Calculator, Zap, BookOpen, Users as UsersIcon } from 'lucide-react';
import Introduction from './Introduction';
import ViewportAnimated from './ViewportAnimated';

const MainContent = () => {
  const navigate = useNavigate();

  // 功能卡片数据配置
  const features = [
    {
      title: '帮战微信接龙筛选',
      description: '帮战接龙职业统计、方便统战做表',
      icon: Users,
      color: 'bg-blue-50 border-blue-200',
      route: '/wechat-chain', // 内部路由
      isExternal: false
    },
    {
      title: '联赛数据分析',
      description: '方便数据横向、竖向对比',
      icon: BarChart3,
      color: 'bg-green-50 border-green-200',
      route: '/league', // 内部路由
      isExternal: false
    },
    {
      title: '微信帮会成员筛选',
      description: '方便筛选出群和帮会帮战人员',
      icon: FileText,
      color: 'bg-purple-50 border-purple-200',
      route: '/members', // 内部路由
      isExternal: false
    },
    {
      title: '插旗/首席内功收益计算',
      description: '专门给喜欢单挑的人',
      icon: Sword,
      color: 'bg-red-50 border-red-200',
      route: '/flag', // 内部路由
      isExternal: false
    },
    {
      title: 'pvp防守团内功收益计算',
      description: '专门给喜欢帮战的人',
      icon: Shield,
      color: 'bg-orange-50 border-orange-200',
      route: '/defense', // 内部路由
      isExternal: false
    },
    {
      title: 'pvp面板收益计算',
      description: '自己面板最真实的收益',
      icon: Target,
      color: 'bg-yellow-50 border-yellow-200',
      route: '/panel', // 内部路由
      isExternal: false
    },
    {
      title: '通用内功选择对比计算',
      description: '方便对比和DIY适合自己的内功收益',
      icon: Calculator,
      color: 'bg-indigo-50 border-indigo-200',
      route: '/skills', // 内部路由
      isExternal: false
    },
    {
      title: '内功收益计算器',
      description: '专业的内功属性收益分析工具',
      icon: Zap,
      color: 'bg-pink-50 border-pink-200',
      route: '/neigong-calculator', // 内部路由
      isExternal: false
    },
    {
      title: '成员匹配指南',
      description: '帮助帮会管理者快速识别成员状态',
      icon: BookOpen,
      color: 'bg-teal-50 border-teal-200',
      route: '/member-match-guide', // 内部路由
      isExternal: false
    },
    {
      title: '帮会成员功能',
      description: '微信帮会成员筛选和管理',
      icon: UsersIcon,
      color: 'bg-blue-50 border-blue-200',
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

      {/* 整齐的2列网格布局 */}
      <div className="mt-8">
        <Grid
          square
          columns={2}
          border={false}
          gap={24}
          className="w-full"
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
                className="cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] w-full"
                style={{
                  height: '220px',
                  minHeight: '220px',
                  maxHeight: '220px',
                  width: '100%'
                }}
              >
                <div className={`h-full flex flex-col items-center justify-center p-6 ${feature.color} w-full transition-all duration-300 hover:brightness-105 rounded-lg`}>
                  <div className="mb-4 transition-transform duration-300 hover:scale-110">
                    <feature.icon className="h-12 w-12 text-gray-700 transition-colors duration-300 hover:text-gray-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center w-full transition-colors duration-300 hover:text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-center w-full transition-colors duration-300 hover:text-gray-700">
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
