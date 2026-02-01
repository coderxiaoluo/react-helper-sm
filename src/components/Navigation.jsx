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
    { icon: MessageSquare, text: '留言板', href: 'https://chat.nestboy.com/kefu.html', external: true }
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
              className="flex flex-col items-center p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 group cursor-pointer"
            >
              <item.icon className="h-6 w-6 text-red-600 mb-2 group-hover:text-red-800" />
              <span className="text-xs text-center text-gray-700 group-hover:text-red-800 font-medium">
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
