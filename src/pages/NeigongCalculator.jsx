import React, { useState, useRef } from 'react';
import { Calculator, Upload, RefreshCw, AlertTriangle, TrendingUp, Shield, Sword, Camera } from 'lucide-react';
import Tesseract from 'tesseract.js';

const NeigongCalculator = () => {
  const [baseStats, setBaseStats] = useState({
    attack: '',
    defense: '',
    health: '',
    critRate: '',
    critDamage: '',
    penetration: '',
    speed: '',
    resistance: ''
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setBaseStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateBenefits = () => {
    setLoading(true);
    
    // 模拟计算过程
    setTimeout(() => {
      const stats = {
        attack: parseFloat(baseStats.attack) || 0,
        defense: parseFloat(baseStats.defense) || 0,
        health: parseFloat(baseStats.health) || 0,
        critRate: parseFloat(baseStats.critRate) || 0,
        critDamage: parseFloat(baseStats.critDamage) || 0,
        penetration: parseFloat(baseStats.penetration) || 0,
        speed: parseFloat(baseStats.speed) || 0,
        resistance: parseFloat(baseStats.resistance) || 0
      };

      // 计算各项评分和收益
      const analysis = {
        offensive: [
          { name: '破盾', value: stats.penetration, score: Math.min(100, stats.penetration / 10), benefit: (stats.penetration / 1000 * 100).toFixed(2) + '%' },
          { name: '攻击', value: stats.attack, score: Math.min(100, stats.attack / 50), benefit: (stats.attack / 5000 * 100).toFixed(2) + '%' },
          { name: '暴击率', value: stats.critRate, score: Math.min(100, stats.critRate * 2), benefit: (stats.critRate * 0.5).toFixed(2) + '%' },
          { name: '暴击伤害', value: stats.critDamage, score: Math.min(100, stats.critDamage / 2), benefit: (stats.critDamage / 200 * 100).toFixed(2) + '%' }
        ],
        defensive: [
          { name: '气盾', value: stats.health, score: Math.min(100, stats.health / 100), benefit: (stats.health / 10000 * 100).toFixed(2) + '%' },
          { name: '防御', value: stats.defense, score: Math.min(100, stats.defense / 50), benefit: (stats.defense / 5000 * 100).toFixed(2) + '%' },
          { name: '格挡', value: stats.resistance, score: Math.min(100, stats.resistance / 10), benefit: (stats.resistance / 1000 * 100).toFixed(2) + '%' }
        ],
        special: [
          { name: '速度', value: stats.speed, score: Math.min(100, stats.speed / 10), benefit: (stats.speed / 1000 * 100).toFixed(2) + '%' }
        ]
      };

      // 计算总收益
      const totalBenefit = Object.values(analysis).flat().reduce((sum, item) => sum + parseFloat(item.benefit), 0);
      
      // 实力评级
      let rating = '';
      if (totalBenefit >= 800) rating = '苍穹之上';
      else if (totalBenefit >= 600) rating = '登峰造极';
      else if (totalBenefit >= 400) rating = '炉火纯青';
      else if (totalBenefit >= 200) rating = '出类拔萃';
      else if (totalBenefit >= 100) rating = '初窥门径';
      else rating = '潜力无穷';

      setResults({
        analysis,
        totalBenefit: totalBenefit.toFixed(2),
        rating
      });
      setLoading(false);
    }, 1000);
  };

  const clearData = () => {
    setBaseStats({
      attack: '',
      defense: '',
      health: '',
      critRate: '',
      critDamage: '',
      penetration: '',
      speed: '',
      resistance: ''
    });
    setResults(null);
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    
    setOcrLoading(true);
    setOcrProgress(0);
    
    Tesseract.recognize(file, 'chi_sim', {
      logger: m => {
        if (m.status === 'recognizing text') {
          setOcrProgress(Math.round(m.progress * 100));
        }
      }
    }).then(({ data: { text } }) => {
      // 解析识别出的文本
      const parsedData = parseOcrText(text);
      
      // 更新状态
      setBaseStats(prev => ({
        ...prev,
        ...parsedData
      }));
      
      setOcrLoading(false);
      alert('截图识别完成！请检查数据是否正确。');
    }).catch(err => {
      console.error('OCR识别失败:', err);
      setOcrLoading(false);
      alert('截图识别失败，请重试或手动输入数据。');
    });
  };

  const parseOcrText = (text) => {
    // 简单的文本解析逻辑，实际应用中可能需要更复杂的正则表达式
    const data = {};
    
    // 尝试匹配常见属性
    const patterns = [
      { key: 'attack', regex: /攻击[^\d]*(\d+)/ },
      { key: 'defense', regex: /防御[^\d]*(\d+)/ },
      { key: 'health', regex: /生命[^\d]*(\d+)/ },
      { key: 'critRate', regex: /暴击[^\d]*(\d+)/ },
      { key: 'critDamage', regex: /暴伤[^\d]*(\d+)/ },
      { key: 'penetration', regex: /穿透[^\d]*(\d+)/ },
      { key: 'speed', regex: /速度[^\d]*(\d+)/ },
      { key: 'resistance', regex: /抗性[^\d]*(\d+)/ }
    ];
    
    patterns.forEach(({ key, regex }) => {
      const match = text.match(regex);
      if (match) {
        data[key] = match[1];
      }
    });
    
    return data;
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-800">内功收益计算器</h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={calculateBenefits}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-2" />
                )}
                计算收益
              </button>
              <button
                onClick={clearData}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                清空数据
              </button>
            </div>
          </div>

          {/* OCR截图上传区域 */}
          <div 
            className="border-2 border-dashed border-purple-300 rounded-lg p-6 mb-8 text-center bg-purple-50 hover:bg-purple-100 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              className="hidden"
            />
            <Camera className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-700 mb-2">上传角色属性截图</h3>
            <p className="text-purple-600 mb-4">支持拖拽或点击上传，自动识别属性数值</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              选择图片
            </button>
            {ocrLoading && (
              <div className="mt-4">
                <div className="text-purple-700 mb-2">正在识别中... {ocrProgress}%</div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${ocrProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 属性输入 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Sword className="h-5 w-5 mr-2 text-red-600" />
                角色基础属性
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">攻击力</label>
                  <input
                    type="number"
                    value={baseStats.attack}
                    onChange={(e) => handleInputChange('attack', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入攻击力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">防御力</label>
                  <input
                    type="number"
                    value={baseStats.defense}
                    onChange={(e) => handleInputChange('defense', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入防御力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">生命值</label>
                  <input
                    type="number"
                    value={baseStats.health}
                    onChange={(e) => handleInputChange('health', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入生命值"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击率 (%)</label>
                  <input
                    type="number"
                    value={baseStats.critRate}
                    onChange={(e) => handleInputChange('critRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入暴击率"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击伤害 (%)</label>
                  <input
                    type="number"
                    value={baseStats.critDamage}
                    onChange={(e) => handleInputChange('critDamage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入暴击伤害"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">穿透值</label>
                  <input
                    type="number"
                    value={baseStats.penetration}
                    onChange={(e) => handleInputChange('penetration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入穿透值"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">速度</label>
                  <input
                    type="number"
                    value={baseStats.speed}
                    onChange={(e) => handleInputChange('speed', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入速度"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">抗性</label>
                  <input
                    type="number"
                    value={baseStats.resistance}
                    onChange={(e) => handleInputChange('resistance', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入抗性"
                  />
                </div>
              </div>
            </div>

            {/* 结果展示 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                收益分析结果
              </h2>
              
              {results ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {results.totalBenefit}%
                      </div>
                      <div className="text-lg text-gray-600 mb-2">总收益</div>
                      <div className="text-2xl font-semibold text-blue-600">
                        {results.rating}
                      </div>
                      <div className="text-sm text-gray-500">实力评级</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">优化建议：</h4>
                    <p className="text-yellow-700 text-sm">
                      {parseFloat(results.totalBenefit) >= 800 
                        ? '🔥 当前配置已达到顶级水准，建议保持现有搭配'
                        : parseFloat(results.totalBenefit) >= 600
                        ? '✅ 配置优秀，可针对短板属性进行微调'
                        : parseFloat(results.totalBenefit) >= 400
                        ? '⚠️ 配置良好，建议重点提升低分项'
                        : '❌ 配置有待优化，建议重新分配属性点'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>输入属性后点击"计算收益"按钮</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 详细分析表格 */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">详细收益分析</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">属性类别</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">属性名</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数值</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">评分</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收益</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.analysis.offensive.map((item, index) => (
                    <tr key={`off-${index}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">进攻属性</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{item.benefit}</td>
                    </tr>
                  ))}
                  {results.analysis.defensive.map((item, index) => (
                    <tr key={`def-${index}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">防守属性</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{item.benefit}</td>
                    </tr>
                  ))}
                  {results.analysis.special.map((item, index) => (
                    <tr key={`spe-${index}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">特殊属性</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-semibold">{item.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">版本说明：</h4>
              <p className="text-blue-700 text-sm">
                基于2026.02.01版本数据计算，阈值参考：潜力无穷(0-100%)、初窥门径(100-200%)、出类拔萃(200-400%)、炉火纯青(400-600%)、登峰造极(600-800%)、苍穹之上(800%+)。
              </p>
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-8">
          <h4 className="font-semibold text-blue-800 mb-2">使用说明：</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• 输入角色的基础属性数据（可在游戏中查看角色面板获取）</li>
            <li>• 点击"计算收益"查看各项属性的评分和收益百分比</li>
            <li>• 系统会根据总收益给出实力评级和优化建议</li>
            <li>• 适用于内功选择、属性分配等优化决策</li>
            <li>• 数据基于2026.02.01版本，不同版本可能存在差异</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NeigongCalculator;
