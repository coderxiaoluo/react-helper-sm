import React, { useState } from 'react';
import { Upload, Download, Users, Filter, Copy, Check, Trash2 } from 'lucide-react';

const Members = () => {
  const [wechatMembers, setWechatMembers] = useState([]);
  const [guildWarMembers, setGuildWarMembers] = useState([]);
  const [guildMembers, setGuildMembers] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const [wechatInput, setWechatInput] = useState('');
  const [guildWarInput, setGuildWarInput] = useState('');
  const [guildInput, setGuildInput] = useState('');

  // 解析数据的通用函数
  const parseData = (rawData) => {
    if (!rawData.trim()) return [];
    
    const lines = rawData.trim().split('\n').filter(line => line.trim());
    const uniqueMembers = new Set();
    
    lines.forEach(line => {
      const cleanLine = line.trim();
      if (cleanLine) {
        uniqueMembers.add(cleanLine);
      }
    });
    
    return Array.from(uniqueMembers);
  };

  // 处理微信群成员数据
  const handleWechatData = () => {
    const parsed = parseData(wechatInput);
    setWechatMembers(parsed);
    setWechatInput('');
  };

  // 处理帮战成员数据
  const handleGuildWarData = () => {
    const parsed = parseData(guildWarInput);
    setGuildWarMembers(parsed);
    setGuildWarInput('');
  };

  // 处理帮会成员数据
  const handleGuildData = () => {
    const parsed = parseData(guildInput);
    setGuildMembers(parsed);
    setGuildInput('');
  };

  // 复制到剪贴板
  const handleCopyId = async (memberId, index) => {
    try {
      await navigator.clipboard.writeText(memberId);
      setCopiedId(index);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  // 计算各种分类
  const getClassifiedMembers = () => {
    const wechatSet = new Set(wechatMembers);
    const guildWarSet = new Set(guildWarMembers);
    const guildSet = new Set(guildMembers);

    return {
      // 两周未帮战但在帮会
      noWarButInGuild: guildMembers.filter(member => 
        guildSet.has(member) && !guildWarSet.has(member)
      ),
      // 未加微信群但在帮会
      notInWechatButInGuild: guildMembers.filter(member => 
        guildSet.has(member) && !wechatSet.has(member)
      ),
      // 未入帮会但在微信群
      inWechatButNotInGuild: wechatMembers.filter(member => 
        wechatSet.has(member) && !guildSet.has(member)
      ),
      // 可能退帮成员（在微信群和帮战记录中，但不在帮会中）
      possibleLeftGuild: wechatMembers.filter(member => 
        wechatSet.has(member) && guildWarSet.has(member) && !guildSet.has(member)
      )
    };
  };

  const classified = getClassifiedMembers();

  // 导出数据
  const exportData = () => {
    const exportObj = {
      微信群成员: wechatMembers,
      两周内帮战成员: guildWarMembers,
      帮会成员: guildMembers,
      两周未帮战但在帮会: classified.noWarButInGuild,
      未加微信群但在帮会: classified.notInWechatButInGuild,
      未入帮会但在微信群: classified.inWechatButNotInGuild,
      可能退帮成员: classified.possibleLeftGuild
    };

    const jsonString = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '帮会成员分析数据.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 清空所有数据
  const clearAllData = () => {
    if (window.confirm('确定要清空所有数据吗？')) {
      setWechatMembers([]);
      setGuildWarMembers([]);
      setGuildMembers([]);
      setWechatInput('');
      setGuildWarInput('');
      setGuildInput('');
    }
  };

  // 渲染成员列表
  const renderMemberList = (members, title, color) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${color}`}>
          {title} ({members.length}人)
        </h3>
      </div>
      
      {members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {members.map((member, index) => (
            <div
              key={index}
              className={`p-2 rounded border cursor-pointer transition-colors duration-200 ${
                copiedId === `${title}-${index}` 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-gray-50 border-gray-200 hover:bg-blue-50'
              }`}
              onClick={() => handleCopyId(member, `${title}-${index}`)}
              title="点击复制"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{member}</span>
                {copiedId === `${title}-${index}` ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p>暂无数据</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">微信帮会成员筛选</h1>
            <div className="flex space-x-2">
              <button
                onClick={exportData}
                disabled={wechatMembers.length === 0 && guildWarMembers.length === 0 && guildMembers.length === 0}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                导出数据
              </button>
              <button
                onClick={clearAllData}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                清空数据
              </button>
            </div>
          </div>

          {/* 数据输入区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* 微信群成员 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">
                微信群成员 ({wechatMembers.length}人)
              </h3>
              <textarea
                value={wechatInput}
                onChange={(e) => setWechatInput(e.target.value)}
                placeholder="粘贴微信群成员名单，每行一个"
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={handleWechatData}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                导入微信群数据
              </button>
            </div>

            {/* 帮战成员 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">
                两周内帮战成员 ({guildWarMembers.length}人)
              </h3>
              <textarea
                value={guildWarInput}
                onChange={(e) => setGuildWarInput(e.target.value)}
                placeholder="粘贴两周内帮战成员名单，每行一个"
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
              <button
                onClick={handleGuildWarData}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                导入帮战数据
              </button>
            </div>

            {/* 帮会成员 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-600">
                帮会成员 ({guildMembers.length}人)
              </h3>
              <textarea
                value={guildInput}
                onChange={(e) => setGuildInput(e.target.value)}
                placeholder="粘贴帮会成员名单，每行一个"
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={handleGuildData}
                className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                导入帮会数据
              </button>
            </div>
          </div>
        </div>

        {/* 基础数据展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {renderMemberList(wechatMembers, '微信群成员', 'text-blue-600')}
          {renderMemberList(guildWarMembers, '两周内帮战成员', 'text-green-600')}
          {renderMemberList(guildMembers, '帮会成员', 'text-purple-600')}
        </div>

        {/* 分析结果展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderMemberList(classified.noWarButInGuild, '两周未帮战但在帮会', 'text-yellow-600')}
          {renderMemberList(classified.notInWechatButInGuild, '未加微信群但在帮会', 'text-orange-600')}
          {renderMemberList(classified.inWechatButNotInGuild, '未入帮会但在微信群', 'text-red-600')}
          {renderMemberList(classified.possibleLeftGuild, '可能退帮成员', 'text-gray-600')}
        </div>

        {/* 使用说明 */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-8">
          <h4 className="font-semibold text-blue-800 mb-2">使用说明：</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• 分别在对应区域粘贴微信群成员、帮战成员和帮会成员数据</li>
            <li>• 系统会自动去重并分类显示各种成员状态</li>
            <li>• 点击成员名称可复制到剪贴板</li>
            <li>• 可导出完整的分析数据为JSON格式</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Members;
