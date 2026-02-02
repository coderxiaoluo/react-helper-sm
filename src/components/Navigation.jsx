import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, FileText, Shield, Target, Calculator, MessageSquare, Filter, BookOpen, Zap } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Filter, text: '帮战微信接龙筛选', href: '/wechat-chain' },
    { icon: BarChart3, text: '联赛数据分析', href: '/league' },
    { icon: FileText, text: '微信帮会成员筛选', href: '/members' },
    { icon: Target, text: '插旗/首席内功收益计算', href: '/flag' },
    { icon: Shield, text: 'pvp防守团内功收益计算', href: '/defense' },
    { icon: Calculator, text: 'pvp面板收益计算', href: '/panel' },
    { icon: Calculator, text: '通用内功选择对比计算', href: '/skills' },
    { icon: Zap, text: '内功收益计算器', href: '/neigong-calculator' },
    { icon: BookOpen, text: '成员匹配指南', href: '/member-match-guide' },
    { icon: Users, text: '帮会成员功能', href: '/members', external: false }
  ];

  const handleNavigation = (href, external) => {
    if (external) {
      window.open(href, '_blank');
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-4">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.href, item.external)}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-[#E8F0F2] transition-colors duration-300 group cursor-pointer transform hover:-translate-y-1"
            >
              <item.icon className="h-6 w-6 text-[#2C4B5E] mb-2 group-hover:text-[#4A6A7C] transition-colors duration-300" />
              <span className="text-xs text-center text-[#1A202C] group-hover:text-[#2C4B5E] font-medium transition-colors duration-300">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
