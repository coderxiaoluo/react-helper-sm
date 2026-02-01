import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw, Copy, Check } from 'lucide-react';
import { parseWeChatChainData, copyToClipboard } from '../utils/dataParser';

const WeChatChainFilter = () => {
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const handleDataParse = () => {
    if (!rawData.trim()) {
      alert('请先粘贴接龙数据');
      return;
    }

    setLoading(true);
    try {
      const data = parseWeChatChainData(rawData);
      setParsedData(data);
    } catch (error) {
      console.error('数据解析失败:', error);
      alert('数据解析失败，请检查数据格式');
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">微信接龙数据筛选</h2>
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
  );
};

export default WeChatChainFilter;
