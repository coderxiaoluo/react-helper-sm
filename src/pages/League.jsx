import React, { useState } from 'react';
import { BarChart3, Upload, Download, Filter, TrendingUp, Users, Trophy, Target } from 'lucide-react';

const League = () => {
  const [leagueData, setLeagueData] = useState([]);
  const [rawInput, setRawInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 解析联赛数据
  const parseLeagueData = () => {
    if (!rawInput.trim()) {
      alert('请先输入联赛数据');
      return;
    }

    setLoading(true);
    try {
      const lines = rawInput.trim().split('\n').filter(line => line.trim());
      const parsed = lines.map((line, index) => {
        const parts = line.split(/\s+/).filter(part => part.trim());
        return {
          id: index + 1,
          playerName: parts[0] || '',
          score: parseInt(parts[1]) || 0,
          rank: parseInt(parts[2]) || 0,
          wins: parseInt(parts[3]) || 0,
          losses: parseInt(parts[4]) || 0,
          winRate: parts[3] && parts[4] ? ((parseInt(parts[3]) / (parseInt(parts[3]) + parseInt(parts[4]))) * 100).toFixed(1) : '0.0'
        };
      });
      
      // 按积分排序
      parsed.sort((a, b) => b.score - a.score);
      setLeagueData(parsed);
    } catch (error) {
      console.error('数据解析失败:', error);
      alert('数据解析失败，请检查数据格式');
    } finally {
      setLoading(false);
    }
  };

  // 导出数据
  const exportData = () => {
    if (leagueData.length === 0) {
      alert('暂无数据可导出');
      return;
    }

    const jsonString = JSON.stringify(leagueData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '联赛数据分析.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 清空数据
  const clearData = () => {
    if (window.confirm('确定要清空所有数据吗？')) {
      setLeagueData([]);
      setRawInput('');
    }
  };

  // 计算统计数据
  const getStatistics = () => {
    if (leagueData.length === 0) return null;

    const totalPlayers = leagueData.length;
    const avgScore = (leagueData.reduce((sum, player) => sum + player.score, 0) / totalPlayers).toFixed(1);
    const avgWinRate = (leagueData.reduce((sum, player) => sum + parseFloat(player.winRate), 0) / totalPlayers).toFixed(1);
    const topPlayer = leagueData[0];

    return {
      totalPlayers,
      avgScore,
      avgWinRate,
      topPlayer
    };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">联赛数据分析</h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={parseLeagueData}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                解析数据
              </button>
              <button
                onClick={exportData}
                disabled={leagueData.length === 0}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                导出数据
              </button>
              <button
                onClick={clearData}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                清空数据
              </button>
            </div>
          </div>

          {/* 数据输入区域 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              粘贴联赛数据
            </label>
            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="请粘贴联赛数据，格式如：&#10;玩家名 积分 排名 胜场 负场&#10;每行一条记录"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              支持格式：玩家名 积分 排名 胜场 负场（每行一条记录）
            </p>
          </div>

          {/* 统计概览 */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-600">参赛人数</p>
                    <p className="text-2xl font-bold text-blue-800">{stats.totalPlayers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-green-600">平均积分</p>
                    <p className="text-2xl font-bold text-green-800">{stats.avgScore}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-600">平均胜率</p>
                    <p className="text-2xl font-bold text-yellow-800">{stats.avgWinRate}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-purple-600">榜首玩家</p>
                    <p className="text-lg font-bold text-purple-800">{stats.topPlayer.playerName}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 数据展示表格 */}
        {leagueData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">联赛排行榜</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">玩家名</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">积分</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">胜场</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负场</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">胜率</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leagueData.map((player, index) => (
                    <tr key={index} className={`hover:bg-gray-50 ${index < 3 ? 'bg-yellow-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          {index === 0 && <Trophy className="h-4 w-4 text-yellow-500 mr-1" />}
                          {index === 1 && <Trophy className="h-4 w-4 text-gray-400 mr-1" />}
                          {index === 2 && <Trophy className="h-4 w-4 text-orange-500 mr-1" />}
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {player.playerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="font-semibold text-blue-600">{player.score}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {player.wins}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        {player.losses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          parseFloat(player.winRate) >= 70 
                            ? 'bg-green-100 text-green-800'
                            : parseFloat(player.winRate) >= 50
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {player.winRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {leagueData.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>暂无联赛数据，请粘贴数据后点击"解析数据"按钮</p>
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-8">
          <h4 className="font-semibold text-blue-800 mb-2">使用说明：</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• 粘贴联赛数据，格式：玩家名 积分 排名 胜场 负场</li>
            <li>• 系统会自动按积分排序并计算胜率</li>
            <li>• 前三名会有特殊标识显示</li>
            <li>• 可导出完整的分析数据为JSON格式</li>
            <li>• 支持横向和纵向数据对比分析</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default League;
