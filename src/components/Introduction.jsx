import React from 'react';
import { Gamepad2, Users, TrendingUp } from 'lucide-react';

const Introduction = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          逆水寒手游-武林盟主.碎梦
        </h2>
        <div className="flex justify-center mb-6">
          <img src="/sm.png" alt="群聊二维码" className="max-w-full h-auto max-h-64" />
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          碎梦刀快，江湖路远，武林盟主区寻同好!
          影随刀动，武林盟主碎梦招并肩之人
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <Gamepad2 className="h-12 w-12 text-red-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">专业游戏工具</h3>
          <p className="text-sm text-gray-600">
            针对逆水寒手游特色打造的专业分析工具
          </p>
        </div>

        <div className="text-center p-4">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">帮会管理</h3>
          <p className="text-sm text-gray-600">
            完善的帮会成员管理和战斗组织功能
          </p>
        </div>

        <div className="text-center p-4">
          <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">数据分析</h3>
          <p className="text-sm text-gray-600">
            深度的游戏数据分析和收益计算
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
