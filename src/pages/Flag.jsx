import React, { useState } from 'react';
import { Target, Calculator, TrendingUp, Shield, Sword, BarChart3 } from 'lucide-react';

const Flag = () => {
  const [playerStats, setPlayerStats] = useState({
    attack: '',
    defense: '',
    health: '',
    critRate: '',
    critDamage: '',
    penetration: ''
  });

  const [skillConfig, setSkillConfig] = useState({
    attackBonus: 0,
    defenseBonus: 0,
    healthBonus: 0,
    critRateBonus: 0,
    critDamageBonus: 0,
    penetrationBonus: 0
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (field, value) => {
    setPlayerStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillChange = (field, value) => {
    setSkillConfig(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateBenefit = () => {
    const stats = {
      attack: parseFloat(playerStats.attack) || 0,
      defense: parseFloat(playerStats.defense) || 0,
      health: parseFloat(playerStats.health) || 0,
      critRate: parseFloat(playerStats.critRate) || 0,
      critDamage: parseFloat(playerStats.critDamage) || 0,
      penetration: parseFloat(playerStats.penetration) || 0
    };

    // 计算内功加成后的属性
    const enhancedStats = {
      attack: stats.attack * (1 + skillConfig.attackBonus / 100),
      defense: stats.defense * (1 + skillConfig.defenseBonus / 100),
      health: stats.health * (1 + skillConfig.healthBonus / 100),
      critRate: Math.min(100, stats.critRate + skillConfig.critRateBonus),
      critDamage: stats.critDamage + skillConfig.critDamageBonus,
      penetration: stats.penetration + skillConfig.penetrationBonus
    };

    // 计算战斗力提升
    const originalPower = calculateCombatPower(stats);
    const enhancedPower = calculateCombatPower(enhancedStats);
    const powerIncrease = enhancedPower - originalPower;
    const percentageIncrease = ((powerIncrease / originalPower) * 100).toFixed(2);

    setResults({
      original: stats,
      enhanced: enhancedStats,
      increase: {
        attack: enhancedStats.attack - stats.attack,
        defense: enhancedStats.defense - stats.defense,
        health: enhancedStats.health - stats.health,
        critRate: enhancedStats.critRate - stats.critRate,
        critDamage: enhancedStats.critDamage - stats.critDamage,
        penetration: enhancedStats.penetration - stats.penetration
      },
      powerIncrease,
      percentageIncrease
    });
  };

  const calculateCombatPower = (stats) => {
    // 简化的战斗力计算公式
    const basePower = stats.attack * 1.2 + stats.defense * 0.8 + stats.health * 0.1;
    const critMultiplier = 1 + (stats.critRate / 100) * (stats.critDamage / 100);
    const penetrationBonus = 1 + (stats.penetration / 1000);
    
    return basePower * critMultiplier * penetrationBonus;
  };

  const clearData = () => {
    setPlayerStats({
      attack: '',
      defense: '',
      health: '',
      critRate: '',
      critDamage: '',
      penetration: ''
    });
    setSkillConfig({
      attackBonus: 0,
      defenseBonus: 0,
      healthBonus: 0,
      critRateBonus: 0,
      critDamageBonus: 0,
      penetrationBonus: 0
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-red-600" />
              <h1 className="text-3xl font-bold text-gray-800">插旗/首席内功收益计算</h1>
            </div>
            <button
              onClick={clearData}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Shield className="h-4 w-4 mr-2" />
              清空数据
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 角色属性输入 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Sword className="h-5 w-5 mr-2 text-blue-600" />
                角色基础属性
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">攻击力</label>
                  <input
                    type="number"
                    value={playerStats.attack}
                    onChange={(e) => handleInputChange('attack', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入攻击力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">防御力</label>
                  <input
                    type="number"
                    value={playerStats.defense}
                    onChange={(e) => handleInputChange('defense', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入防御力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">生命值</label>
                  <input
                    type="number"
                    value={playerStats.health}
                    onChange={(e) => handleInputChange('health', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入生命值"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击率 (%)</label>
                  <input
                    type="number"
                    value={playerStats.critRate}
                    onChange={(e) => handleInputChange('critRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入暴击率"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击伤害 (%)</label>
                  <input
                    type="number"
                    value={playerStats.critDamage}
                    onChange={(e) => handleInputChange('critDamage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入暴击伤害"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">穿透值</label>
                  <input
                    type="number"
                    value={playerStats.penetration}
                    onChange={(e) => handleInputChange('penetration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入穿透值"
                  />
                </div>
              </div>
            </div>

            {/* 内功配置 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-green-600" />
                内功加成配置
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">攻击力加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.attackBonus}
                    onChange={(e) => handleSkillChange('attackBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">防御力加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.defenseBonus}
                    onChange={(e) => handleSkillChange('defenseBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">生命值加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.healthBonus}
                    onChange={(e) => handleSkillChange('healthBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击率加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.critRateBonus}
                    onChange={(e) => handleSkillChange('critRateBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">暴击伤害加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.critDamageBonus}
                    onChange={(e) => handleSkillChange('critDamageBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">穿透值加成</label>
                  <input
                    type="number"
                    step="1"
                    value={skillConfig.penetrationBonus}
                    onChange={(e) => handleSkillChange('penetrationBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <button
                onClick={calculateBenefit}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                计算收益
              </button>
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
              收益分析结果
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 属性对比 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">属性对比</h3>
                <div className="space-y-3">
                  {[
                    { key: 'attack', label: '攻击力', color: 'text-red-600' },
                    { key: 'defense', label: '防御力', color: 'text-blue-600' },
                    { key: 'health', label: '生命值', color: 'text-green-600' },
                    { key: 'critRate', label: '暴击率', color: 'text-yellow-600' },
                    { key: 'critDamage', label: '暴击伤害', color: 'text-purple-600' },
                    { key: 'penetration', label: '穿透值', color: 'text-indigo-600' }
                  ].map(({ key, label, color }) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">{label}</span>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {Math.round(results.original[key])} → {Math.round(results.enhanced[key])}
                        </div>
                        <div className={`font-semibold ${color}`}>
                          +{Math.round(results.increase[key])}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 战斗力提升 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">战斗力提升</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      +{Math.round(results.powerIncrease)}
                    </div>
                    <div className="text-lg text-gray-600 mb-4">战斗力提升</div>
                    <div className="text-2xl font-semibold text-purple-600">
                      {results.percentageIncrease}%
                    </div>
                    <div className="text-sm text-gray-500">提升百分比</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">收益评估：</h4>
                  <p className="text-yellow-700 text-sm">
                    {parseFloat(results.percentageIncrease) >= 10 
                      ? '🔥 收益显著，强烈推荐此内功配置'
                      : parseFloat(results.percentageIncrease) >= 5
                      ? '✅ 收益良好，推荐使用此内功配置'
                      : '⚠️ 收益一般，可考虑其他内功配置'
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
            <li>• 输入角色的基础属性数据（可在游戏中查看角色面板获取）</li>
            <li>• 配置想要测试的内功加成数值</li>
            <li>• 点击"计算收益"查看内功带来的属性提升和战斗力增长</li>
            <li>• 适用于插旗、首席等单挑场景的内功选择参考</li>
            <li>• 建议多次测试不同内功配置，选择收益最高的方案</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Flag;
