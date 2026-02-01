import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw, Copy, Check, Users, BarChart3, AlertCircle } from 'lucide-react';
import { parseWeChatChainData, copyToClipboard } from '../utils/dataParser';

const WeChatChain = () => {
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleDataParse = () => {
    if (!rawData.trim()) {
      alert('请先粘贴接龙数据');
      return;
    }

    setLoading(true);
    try {
      const data = parseWeChatChainData(rawData);
      setParsedData(data);
      
      // 分析数据
      analyzeData(data);
    } catch (error) {
      console.error('数据解析失败:', error);
      alert('数据解析失败，请检查数据格式');
    } finally {
      setLoading(false);
    }
  };

  const analyzeData = (data) => {
    // 职业统计
    const professionStats = {};
    const specialNeeds = [];
    const players = [];

    data.forEach(player => {
      // 职业统计
      const profession = player.profession || '未知';
      professionStats[profession] = (professionStats[profession] || 0) + 1;

      // 玩家清单
      players.push({
        id: player.playerId,
        class: profession,
        note: player.yixianqian || '-'
      });

      // 特殊需求
      if (player.yixianqian && player.yixianqian !== '-' && player.yixianqian !== '未绑定' && player.yixianqian !== '已绑定') {
        specialNeeds.push({
          id: player.playerId,
          note: player.yixianqian
        });
      }
    });

    // 计算占比
    const totalPlayers = data.length;
    const professionWithPercentage = Object.entries(professionStats).map(([profession, count]) => ({
      profession,
      count,
      percentage: ((count / totalPlayers) * 100).toFixed(1) + '%'
    }));

    // 职业分组
    const professionGroups = {};
    data.forEach(player => {
      const profession = player.profession || '未知';
      if (!professionGroups[profession]) {
        professionGroups[profession] = [];
      }
      professionGroups[profession].push(player.playerId);
    });

    setAnalysisResult({
      players,
      professionStats: professionWithPercentage,
      specialNeeds,
      professionGroups,
      totalPlayers
    });
  };

  const handleCopyId = async (playerId, index) => {
    const success = await copyToClipboard(playerId);
    if (success) {
      setCopiedId(index);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExport = () => {
    if (parsedData.length === 0) {
      alert('暂无数据可导出');
      return;
    }

    const jsonString = JSON.stringify(parsedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '微信接龙数据.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyAnalysisResult = async () => {
    if (!analysisResult) {
      alert('请先解析数据');
      return;
    }

    const markdown = generateMarkdownReport();
    const success = await copyToClipboard(markdown);
    if (success) {
      alert('分析报告已复制到剪贴板');
    }
  };

  const generateMarkdownReport = () => {
    const { players, professionStats, specialNeeds, professionGroups } = analysisResult;
    
    let markdown = '### 玩家清单\n';
    markdown += '| ID | 职业 | 备注 |\n';
    markdown += '|-----|------|------|\n';
    players.forEach(player => {
      markdown += `| ${player.id} | ${player.class} | ${player.note} |\n`;
    });

    markdown += '\n### 职业统计\n';
    markdown += '| 职业 | 人数 | 占比 |\n';
    markdown += '|------|------|------|\n';
    professionStats.forEach(stat => {
      markdown += `| ${stat.profession} | ${stat.count} | ${stat.percentage} |\n`;
    });

    markdown += '\n### 特殊需求列表\n';
    markdown += '| ID | 需求内容 |\n';
    markdown += '|-----|----------|\n';
    specialNeeds.forEach(need => {
      markdown += `| ${need.id} | ${need.note} |\n`;
    });

    markdown += '\n### 职业分组\n';
    Object.entries(professionGroups).forEach(([profession, members]) => {
      markdown += `- **${profession}组**：${members.join('、')}\n`;
    });

    return markdown;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">帮战微信接龙筛选</h1>
            <div className="flex space-x-2">
              <button
                onClick={handleDataParse}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                解析数据
              </button>
              <button
                onClick={handleExport}
                disabled={parsedData.length === 0}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                导出JSON
              </button>
              <button
                onClick={copyAnalysisResult}
                disabled={!analysisResult}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                <Copy className="h-4 w-4 mr-2" />
                复制报告
              </button>
            </div>
          </div>

          {/* 数据输入区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              粘贴微信接龙数据
            </label>
            <textarea
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              placeholder="请粘贴微信接龙数据，格式如：&#10;玩家001 长安 法师 已绑定&#10;玩家002 洛阳 战士 未绑定"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              支持格式：ID 位置 职业 一线牵状态（每行一条记录）
            </p>
          </div>

          {/* 数据展示表格 */}
          {parsedData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">序</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID（双击复制）</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">位置</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">职业</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">一线牵</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parsedData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td 
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors duration-200 ${
                          copiedId === index 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        onDoubleClick={() => handleCopyId(item.playerId, index)}
                        title="双击复制ID"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{item.playerId}</span>
                          {copiedId === index ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.profession}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.yixianqian === '已绑定' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.yixianqian}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {parsedData.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>暂无数据，请粘贴接龙数据后点击"解析数据"按钮</p>
            </div>
          )}
        </div>

        {/* 分析结果展示 */}
        {analysisResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              数据分析结果
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 职业统计 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-600" />
                  职业统计
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">职业</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">人数</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">占比</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {analysisResult.professionStats.map((stat, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {stat.profession}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {stat.count}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {stat.percentage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 特殊需求 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-yellow-600" />
                  特殊需求列表
                </h3>
                {analysisResult.specialNeeds.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">需求内容</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analysisResult.specialNeeds.map((need, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {need.id}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                              {need.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>暂无特殊需求</p>
                  </div>
                )}
              </div>
            </div>

            {/* 职业分组 */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">职业分组</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(analysisResult.professionGroups).map(([profession, members]) => (
                  <div key={profession} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">{profession}组 ({members.length}人)</h4>
                    <div className="flex flex-wrap gap-2">
                      {members.map((member, index) => (
                        <span key={index} className="px-2 py-1 bg-white rounded text-sm text-gray-700 border">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeChatChain;
