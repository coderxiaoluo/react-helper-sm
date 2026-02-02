import React, { useState } from 'react';
import { Gamepad2, Users, TrendingUp, X } from 'lucide-react';
import { Image } from 'react-vant';

const Introduction = () => {
  const [showModal, setShowModal] = useState(false);

  const handleQrCodeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 max-w-7xl mx-auto overflow-hidden">
        {/* 标题和二维码部分 */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            逆水寒手游-武林盟主.碎梦
          </h2>

          {/* 二维码容器 */}
          <div className="mb-8 relative z-10">
            <div className="max-w-md mx-auto">
              <Image
                src="/images/sm.png"
                alt="群聊二维码"
                lazyload
                className="w-full h-auto max-h-64 cursor-pointer hover:opacity-90 transition-opacity duration-200 object-contain relative z-10"
                onClick={handleQrCodeClick}
              />
            </div>
          </div>

          {/* 描述文字 */}
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            碎梦刀快，江湖路远，武林盟主区寻同好!
            影随刀动，武林盟主碎梦招并肩之人
          </p>
        </div>

        {/* 二维码放大模态框 */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <div
              className="relative max-w-2xl max-h-[90vh] z-60"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/images/sm.png"
                alt="群聊二维码放大"
                className="max-w-full max-h-[90vh] object-contain z-60"
              />
              <button
                className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-colors z-70"
                onClick={handleCloseModal}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 特性卡片网格 - 单独的div */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-0">
        {/* 特性卡片 1 */}
        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
          <Gamepad2 className="h-12 w-12 text-[#2C4B5E] mx-auto mb-4" />
          <h3 className="font-semibold text-[#1A202C] mb-3">专业游戏工具</h3>
          <p className="text-sm text-[#1A202C] opacity-80">
            针对逆水寒手游特色打造的专业分析工具
          </p>
        </div>

        {/* 特性卡片 2 */}
        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
          <Users className="h-12 w-12 text-[#2C4B5E] mx-auto mb-4" />
          <h3 className="font-semibold text-[#1A202C] mb-3">帮会管理</h3>
          <p className="text-sm text-[#1A202C] opacity-80">
            完善的帮会成员管理和战斗组织功能
          </p>
        </div>

        {/* 特性卡片 3 */}
        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
          <TrendingUp className="h-12 w-12 text-[#2C4B5E] mx-auto mb-4" />
          <h3 className="font-semibold text-[#1A202C] mb-3">数据分析</h3>
          <p className="text-sm text-[#1A202C] opacity-80">
            深度的游戏数据分析和收益计算
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
