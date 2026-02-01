import React, { useState } from 'react';
import { BarChart3, Calculator, TrendingUp, User, Zap, Shield } from 'lucide-react';

const Panel = () => {
  const [currentStats, setCurrentStats] = useState({
    attack: '',
    defense: '',
    health: '',
    critRate: '',
    critDamage: '',
    penetration: '',
    speed: '',
    resistance: ''
  });

  const [targetStats, setTargetStats] = useState({
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

  const handleCurrentStatsChange = (field, value) => {
    setCurrentStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTargetStatsChange = (field, value) => {
    setTargetStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculatePanelBenefit = () => {
    const current = {
      attack: parseFloat(currentStats.attack) || 0,
      defense: parseFloat(currentStats.defense) || 0,
      health: parseFloat(currentStats.health) || 0,
      critRate: parseFloat(currentStats.critRate) || 0,
      critDamage: parseFloat(currentStats.critDamage) || 0,
      penetration: parseFloat(currentStats.penetration) || 0,
      speed: parseFloat(currentStats.speed) || 0,
      resistance: parseFloat(currentStats.resistance) || 0
    };

    const target = {
      attack: parseFloat(targetStats.attack) || 0,
      defense: parseFloat(targetStats.defense) || 0,
      health: parseFloat(targetStats.health) || 0,
      critRate: parseFloat(targetStats.critRate) || 0,
      critDamage: parseFloat(targetStats.critDamage) || 0,
      penetration: parseFloat(targetStats.penetration) || 0,
      speed: parseFloat(targetStats.speed) || 0,
      resistance: parseFloat(targetStats.resistance) || 0
    };

    // 计算属性差值
    const difference = {
      attack: target.attack - current.attack,
      defense: target.defense - current.defense,
      health: target.health - current.health,
      critRate: target.critRate - current.critRate,
      critDamage: target.critDamage - current.critDamage,
      penetration: target.penetration - current.penetration,
      speed: target.speed - current.speed,
      resistance: target.resistance - current.resistance
    };

    // 计算战斗力
    const currentPower = calculateCombatPower(current);
    const targetPower = calculateCombatPower(target);
    const powerDifference = targetPower - currentPower;
    const percentageChange = currentPower > 0 ? ((powerDifference / currentPower) * 100).toFixed(2) : '0.00';

    // 计算各属性的收益权重
    const benefitAnalysis = analyzeBenefit(difference, current);

    setResults({
      current,
      target,
      difference,
      currentPower,
      targetPower,
      powerDifference,
      percentageChange,
      benefitAnalysis
    });
  };

  const calculateCombatPower = (stats) => {
    // 综合战斗力计算公式
    const attackPower = stats.attack * 1.3;
    const defensePower = stats.defense * 0.9;
    const healthPower = stats.health * 0.12;
    const critPower = (stats.critRate / 100) * (stats.critDamage / 100) * stats.attack * 0.8;
    const penetrationPower = stats.penetration * 0.5;
    const speedPower = stats.speed * 0.3;
    const resistancePower = stats.resistance * 0.4;
    
    return attackPower + defensePower + healthPower + critPower + penetrationPower + speedPower + resistancePower;
  };

  const analyzeBenefit = (diff, current) => {
    const analysis = [];
    
    // 攻击力收益分析
    if (diff.attack !== 0) {
      const attackBenefit = (diff.attack / (current.attack || 1)) * 100;
      analysis.push({
        stat: '攻击力',
        value: diff.attack,
        percentage: attackBenefit.toFixed(1),
        impact: Math.abs(diff.attack) * 1.3,
        type: diff.attack > 0 ? 'positive' : 'negative'
      });
    }

    // 防御力收益分析
    if (diff.defense !== 0) {
      const defenseBenefit = (diff.defense / (current.defense || 1)) * 100;
      analysis.push({
        stat: '防御力',
        value: diff.defense,
        percentage: defenseBenefit.toFixed(1),
        impact: Math.abs(diff.defense) * 0.9,
        type: diff.defense > 0 ? 'positive' : 'negative'
      });
    }

    // 生命值收益分析
    if (diff.health !== 0) {
      const healthBenefit = (diff.health / (current.health || 1)) * 100;
      analysis.push({
        stat: '生命值',
        value: diff.health,
        percentage: healthBenefit.toFixed(1),
        impact: Math.abs(diff.health) * 0.12,
        type: diff.health > 0 ? 'positive' : 'negative'
      });
    }

    // 暴击收益分析
    if (diff.critRate !== 0 || diff.critDamage !== 0) {
      const critImpact = Math.abs(diff.critRate) * 10 + Math.abs(diff.critDamage) * 5;
      analysis.push({
        stat: '暴击系统',
        value: `暴击率${diff.critRate > 0 ? '+' : ''}${diff.critRate}% 暴伤${diff.critDamage > 0 ? '+' : ''}${diff.critDamage}%`,
        percentage: ((critImpact / (current.attack || 1)) * 100).toFixed(1),
        impact: critImpact,
        type: (diff.critRate + diff.critDamage) > 0 ? 'positive' : 'negative'
      });
    }

    // 按影响力排序
    return analysis.sort((a, b) => b.impact - a.impact);
  };

  const clearData = () => {
    setCurrentStats({
      attack: '',
      defense: '',
      health: '',
      critRate: '',
      critDamage: '',
      penetration: '',
      speed: '',
      resistance: ''
    });
    setTargetStats({
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

  const copyCurrentToTarget = () => {
    setTargetStats({ ...currentStats });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-800">PVP面板收益计算</h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={copyCurrentToTarget}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <User className="h-4 w-4 mr-2" />
                复制当前面板
              </button>
              <button
                onClick={clearData}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Shield className="h-4 w-4 mr-2" />
                清空数据
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 当前面板 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                当前面板属性
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">攻击力</label>
                  <input
                    type="number"
                    value={currentStats.attack}
                    onChange={(e) => handleCurrentStatsChange('attack', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="当前攻击力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">防御力</label>
                  <input
                    type="number"
                    value={currentStats.defense}
                    onChange={(e) => handleCurrentStatsChange('defense', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="当前防御力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">生命值</label>
                  <input
                    type="number"
                    value={currentStats.health}
                    onChange={(e) => handleCurrentStatsChange('health', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="当前生命值"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击率 (%)</label>
                  <input
                    type="number"
                    value={currentStats.critRate}
                    onChange={(e) => handleCurrentStatsChange('critRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="当前暴击率"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击伤害 (%)</label>
                  <input
                    type="number"
                    value={currentStats.critDamage}
                    onChange={(e) => handleCurrentStatsChange('critDamage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="当前暴击伤害"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">穿透值</label>
                  <input
                    type="number"
                    value={currentStats.penetration}
                    onChange={(e) => handleCurrentStatsChange('penetration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="当前穿透值"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">速度</label>
                  <input
                    type="number"
                    value={currentStats.speed}
                    onChange={(e) => handleCurrentStatsChange('speed', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="当前速度"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">抗性</label>
                  <input
                    type="number"
                    value={currentStats.resistance}
                    onChange={(e) => handleCurrentStatsChange('resistance', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="当前抗性"
                  />
                </div>
              </div>
            </div>

            {/* 目标面板 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-green-600" />
                目标面板属性
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">攻击力</label>
                  <input
                    type="number"
                    value={targetStats.attack}
                    onChange={(e) => handleTargetStatsChange('attack', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="目标攻击力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">防御力</label>
                  <input
                    type="number"
                    value={targetStats.defense}
                    onChange={(e) => handleTargetStatsChange('defense', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="目标防御力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">生命值</label>
                  <input
                    type="number"
                    value={targetStats.health}
                    onChange={(e) => handleTargetStatsChange('health', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="目标生命值"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击率 (%)</label>
                  <input
                    type="number"
                    value={targetStats.critRate}
                    onChange={(e) => handleTargetStatsChange('critRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="目标暴击率"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击伤害 (%)</label>
                  <input
                    type="number"
                    value={targetStats.critDamage}
                    onChange={(e) => handleTargetStatsChange('critDamage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="目标暴击伤害"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">穿透值</label>
                  <input
                    type="number"
                    value={targetStats.penetration}
                    onChange={(e) => handleTargetStatsChange('penetration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="目标穿透值"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">速度</label>
                  <input
                    type="number"
                    value={targetStats.speed}
                    onChange={(e) => handleTargetStatsChange('speed', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="目标速度"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">抗性</label>
                  <input
                    type="number"
                    value={targetStats.resistance}
                    onChange={(e) => handleTargetStatsChange('resistance', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="目标抗性"
                  />
                </div>
              </div>
              
              <button
                onClick={calculatePanelBenefit}
                className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium"
              >
                <Calculator className="h-5 w-5 mr-2" />
                计算面板收益
              </button>
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-purple-600" />
              面板收益分析结果
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 属性变化对比 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">属性变化对比</h3>
                <div className="space-y-3">
                  {[
                    { key: 'attack', label: '攻击力', color: 'text-red-600' },
                    { key: 'defense', label: '防御力', color: 'text-blue-600' },
                    { key: 'health', label: '生命值', color: 'text-green-600' },
                    { key: 'critRate', label: '暴击率', color: 'text-yellow-600' },
                    { key: 'critDamage', label: '暴击伤害', color: 'text-purple-600' },
                    { key: 'penetration', label: '穿透值', color: 'text-indigo-600' },
                    { key: 'speed', label: '速度', color: 'text-pink-600' },
                    { key: 'resistance', label: '抗性', color: 'text-gray-600' }
                  ].map(({ key, label, color }) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">{label}</span>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {Math.round(results.current[key])} → {Math.round(results.target[key])}
                        </div>
                        <div className={`font-semibold ${
                          results.difference[key] > 0 ? 'text-green-600' : 
                          results.difference[key] < 0 ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {results.difference[key] > 0 ? '+' : ''}{Math.round(results.difference[key])}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 战斗力分析 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">战斗力分析</h3>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">当前战斗力</div>
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      {Math.round(results.currentPower)}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">目标战斗力</div>
                    <div className="text-2xl font-bold text-green-600 mb-4">
                      {Math.round(results.targetPower)}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="text-sm text-gray-600 mb-2">战斗力变化</div>
                      <div className={`text-3xl font-bold mb-2 ${
                        results.powerDifference > 0 ? 'text-green-600' : 
                        results.powerDifference < 0 ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {results.powerDifference > 0 ? '+' : ''}{Math.round(results.powerDifference)}
                      </div>
                      <div className={`text-lg font-semibold ${
                        parseFloat(results.percentageChange) > 0 ? 'text-green-600' : 
                        parseFloat(results.percentageChange) < 0 ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {results.percentageChange}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 收益分析 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">收益分析排行</h3>
                <div className="space-y-3">
                  {results.benefitAnalysis.map((benefit, index) => (
                    <div key={index} className={`p-3 rounded border-l-4 ${
                      benefit.type === 'positive' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-800">{benefit.stat}</div>
                          <div className="text-sm text-gray-600">{benefit.value}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${
                            benefit.type === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {benefit.percentage}%
                          </div>
                          <div className="text-xs text-gray-500">
                            影响力: {Math.round(benefit.impact)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">面板优化建议：</h4>
                  <p className="text-yellow-700 text-sm">
                    {parseFloat(results.percentageChange) > 10 
                      ? '🔥 面板提升显著，建议按此目标进行装备优化'
                      : parseFloat(results.percentageChange) > 5
                      ? '✅ 面板提升良好，值得投入资源优化'
                      : parseFloat(results.percentageChange) > 0
                      ? '⚠️ 面板提升有限，建议重新评估优化方向'
                      : '❌ 面板出现下降，请检查目标配置'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-8">
          <h4 className="font-semibold text-blue-800 mb-2">使用说明：</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• 在"当前面板"中输入你现在的角色属性数据</li>
            <li>• 在"目标面板"中输入你想要达到的属性目标</li>
            <li>• 可以点击"复制当前面板"快速填充目标面板，然后修改部分属性</li>
            <li>• 系统会计算真实的战斗力变化和各属性的收益贡献</li>
            <li>• 适用于装备升级、内功选择、属性分配等优化决策</li>
            <li>• 重点关注收益分析排行，优先提升影响力最大的属性</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Panel;
