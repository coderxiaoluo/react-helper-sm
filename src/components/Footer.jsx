import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-gray-300">
              专为逆水寒手游玩家打造
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 逆水寒手游竞技玩家. 版权所有.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            本站为非营利性工具网站，所有数据仅供参考
          </p>
          <a href="https://github.com/coderxiaoluo/react-helper-sm" className="text-gray-500 text-xs mt-2">
            github :https://github.com/coderxiaoluo/react-helper-sm
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
