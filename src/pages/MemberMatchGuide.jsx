import React from 'react';

const MemberMatchGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">微信帮会成员匹配工具使用指南</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. 工具概述</h2>
            <p className="text-gray-600 leading-relaxed">
              微信帮会成员数据匹配工具，用于比对微信群成员、帮战数据和帮会成员名单，帮助帮会管理者快速识别成员状态。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. 数据准备</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">微信群成员获取方式：</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>微信群接龙</li>
                  <li>专用工具采集</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">帮战成员获取方式：</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>导出两周内帮战数据</li>
                  <li>删除重复项</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">帮会成员获取方式：</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>使用PixPin长截图工具</li>
                  <li>通过freeocr.ai识别文字</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. 操作步骤</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-4">
              <li className="pl-2">
                <span className="font-medium">点击对应区域的"粘贴数据"按钮</span>
              </li>
              <li className="pl-2">
                <span className="font-medium">将准备好的数据粘贴到输入框</span>
              </li>
              <li className="pl-2">
                <span className="font-medium">系统自动分类显示7类成员：</span>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>微信群成员</li>
                  <li>两周内帮战过成员</li>
                  <li>帮会成员</li>
                  <li>两周未帮战但在帮会</li>
                  <li>未加微信群但在帮会</li>
                  <li>未入帮会但在微信群</li>
                  <li>可能退帮成员</li>
                </ul>
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">4. 功能说明</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>支持点击表头排序</li>
              <li>实时显示已导入数据量</li>
              <li>自动去重处理</li>
            </ul>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-blue-700">
              <strong>提示：</strong> 本工具为帮会管理提供数据支持，请确保数据隐私安全，仅用于内部管理用途。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberMatchGuide;
