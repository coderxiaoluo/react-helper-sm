import React, { useState } from 'react';
import { Calculator, Plus, Trash2, TrendingUp, BarChart3, Zap } from 'lucide-react';

const Skills = () => {
  const [baseStats, setBaseStats] = useState({
    attack: '',
    defense: '',
    health: '',
    critRate: '',
    critDamage: '',
    penetration: ''
  });

  const [skillConfigs, setSkillConfigs] = useState([
    {
      id: 1,
      name: '内功方案A',
      attackBonus: 0,
      defenseBonus: 0,
      healthBonus: 0,
      critRateBonus: 0,
      critDamageBonus: 0,
      penetrationBonus: 0,
      specialEffect: ''
    }
  ]);

  const [results, setResults] = useState([]);

  const handleBaseStatsChange = (field, value) => {
    setBaseStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillConfigChange = (id, field, value) => {
    setSkillConfigs(prev => prev.map(config => 
      config.id === id ? { ...config, [field]: value } : config
    ));
  };

  const addSkillConfig = () => {
    const newId = Math.max(...skillConfigs.map(c => c.id)) + 1;
    setSkillConfigs(prev => [...prev, {
      id: newId,
      name: `内功方案${String.fromCharCode(65 + prev.length)}`,
      attackBonus: 0,
      defenseBonus: 0,
      healthBonus: 0,
      critRateBonus: 0,
      critDamageBonus: 0,
      penetrationBonus: 0,
      specialEffect: ''
    }]);
  };

  const removeSkillConfig = (id) => {
    if (skillConfigs.length > 1) {
      setSkillConfigs(prev => prev.filter(config => config.id !== id));
    }
  };

  const calculateAllBenefits = () => {
    const base = {
      attack: parseFloat(baseStats.attack) || 0,
      defense: parseFloat(baseStats.defense) || 0,
      health: parseFloat(baseStats.health) || 0,
      critRate: parseFloat(baseStats.critRate) || 0,
      critDamage: parseFloat(baseStats.critDamage) || 0,
      penetration: parseFloat(baseStats.penetration) || 0
    };

    if (base.attack === 0 && base.defense === 0 && base.health === 0) {
      alert('请先输入基础属性');
      return;
    }

    const calculatedResults = skillConfigs.map(config => {
      // 计算加成后的属性
      const enhanced = {
        attack: base.attack * (1 + (parseFloat(config.attackBonus) || 0) / 100),
        defense: base.defense * (1 + (parseFloat(config.defenseBonus) || 0) / 100),
        health: base.health * (1 + (parseFloat(config.healthBonus) || 0) / 100),
        critRate: Math.min(100, base.critRate + (parseFloat(config.critRateBonus) || 0)),
        critDamage: base.critDamage + (parseFloat(config.critDamageBonus) || 0),
        penetration: base.penetration + (parseFloat(config.penetrationBonus) || 0)
      };

      // 计算战斗力
      const basePower = calculateCombatPower(base);
      const enhancedPower = calculateCombatPower(enhanced);
      const powerIncrease = enhancedPower - basePower;
      const percentageIncrease = ((powerIncrease / basePower) * 100).toFixed(2);

      // 计算属性增量
      const increase = {
        attack: enhanced.attack - base.attack,
        defense: enhanced.defense - base.defense,
        health: enhanced.health - base.health,
        critRate: enhanced.critRate - base.critRate,
        critDamage: enhanced.critDamage - base.critDamage,
        penetration: enhanced.penetration - base.penetration
      };

      return {
        config,
        base,
        enhanced,
        increase,
        basePower,
        enhancedPower,
        powerIncrease,
        percentageIncrease: parseFloat(percentageIncrease)
      };
    });

    // 按收益排序
    calculatedResults.sort((a, b) => b.percentageIncrease - a.percentageIncrease);
    setResults(calculatedResults);
  };

  const calculateCombatPower = (stats) => {
    const basePower = stats.attack * 1.2 + stats.defense * 0.8 + stats.health * 0.1;
    const critMultiplier = 1 + (stats.critRate / 100) * (stats.critDamage / 100);
    const penetrationBonus = 1 + (stats.penetration / 1000);
    
    return basePower * critMultiplier * penetrationBonus;
  };

  const clearData = () => {
    setBaseStats({
      attack: '',
      defense: '',
      health: '',
      critRate: '',
      critDamage: '',
      penetration: ''
    });
    setSkillConfigs([{
      id: 1,
      name: '内功方案A',
      attackBonus: 0,
      defenseBonus: 0,
      healthBonus: 0,
      critRateBonus: 0,
      critDamageBonus: 0,
      penetrationBonus: 0,
      specialEffect: ''
    }]);
    setResults([]);
  };

  const getBestConfig = () => {
    if (results.length === 0) return null;
    return results[0];
  };

  const bestConfig = getBestConfig();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">通用内功选择对比计算</h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={calculateAllBenefits}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                计算对比
              </button>
              <button
                onClick={clearData}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                清空数据
              </button>
            </div>
          </div>

          {/* 基础属性输入 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              角色基础属性
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">攻击力</label>
                <input
                  type="number"
                  value={baseStats.attack}
                  onChange={(e) => handleBaseStatsChange('attack', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="基础攻击力"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">防御力</label>
                <input
                  type="number"
                  value={baseStats.defense}
                  onChange={(e) => handleBaseStatsChange('defense', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="基础防御力"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">生命值</label>
                <input
                  type="number"
                  value={baseStats.health}
                  onChange={(e) => handleBaseStatsChange('health', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="基础生命值"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">暴击率 (%)</label>
                <input
                  type="number"
                  value={baseStats.critRate}
                  onChange={(e) => handleBaseStatsChange('critRate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="基础暴击率"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">暴击伤害 (%)</label>
                <input
                  type="number"
                  value={baseStats.critDamage}
                  onChange={(e) => handleBaseStatsChange('critDamage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="基础暴击伤害"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">穿透值</label>
                <input
                  type="number"
                  value={baseStats.penetration}
                  onChange={(e) => handleBaseStatsChange('penetration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="基础穿透值"
                />
              </div>
            </div>
          </div>

          {/* 内功配置列表 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">内功方案配置</h2>
              <button
                onClick={addSkillConfig}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加方案
              </button>
            </div>

            <div className="space-y-6">
              {skillConfigs.map((config, index) => (
                <div key={config.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) => handleSkillConfigChange(config.id, 'name', e.target.value)}
                      className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                    />
                    {skillConfigs.length > 1 && (
                      <button
                        onClick={() => removeSkillConfig(config.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">攻击加成 (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.attackBonus}
                        onChange={(e) => handleSkillConfigChange(config.id, 'attackBonus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">防御加成 (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.defenseBonus}
                        onChange={(e) => handleSkillConfigChange(config.id, 'defenseBonus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">生命加成 (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.healthBonus}
                        onChange={(e) => handleSkillConfigChange(config.id, 'healthBonus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">暴击率加成 (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.critRateBonus}
                        onChange={(e) => handleSkillConfigChange(config.id, 'critRateBonus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">暴伤加成 (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.critDamageBonus}
                        onChange={(e) => handleSkillConfigChange(config.id, 'critDamageBonus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">穿透加成</label>
                      <input
                        type="number"
                        step="1"
                        value={config.penetrationBonus}
                        onChange={(e) => handleSkillConfigChange(config.id, 'penetrationBonus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">特殊效果说明</label>
                    <input
                      type="text"
                      value={config.specialEffect}
                      onChange={(e) => handleSkillConfigChange(config.id, 'specialEffect', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="描述内功的特殊效果或被动技能"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 对比结果 */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
              内功方案对比结果
            </h2>

            {/* 最佳方案推荐 */}
            {bestConfig && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  🏆 最佳方案推荐
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{bestConfig.config.name}</div>
                    <div className="text-sm text-gray-600">{bestConfig.config.specialEffect}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">+{Math.round(bestConfig.powerIncrease)}</div>
                    <div className="text-sm text-gray-600">战斗力提升</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{bestConfig.percentageIncrease}%</div>
                    <div className="text-sm text-gray-600">提升百分比</div>
                  </div>
                </div>
              </div>
            )}

            {/* 详细对比表格 */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方案名称</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">战斗力提升</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提升百分比</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">攻击提升</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">防御提升</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">生命提升</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特殊效果</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <tr key={result.config.id} className={`hover:bg-gray-50 ${index === 0 ? 'bg-green-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          {index === 0 && <span className="text-yellow-500 mr-1">🏆</span>}
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.config.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        +{Math.round(result.powerIncrease)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                        {result.percentageIncrease}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        +{Math.round(result.increase.attack)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        +{Math.round(result.increase.defense)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        +{Math.round(result.increase.health)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {result.config.specialEffect || '无特殊效果'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-8">
          <h4 className="font-semibold text-blue-800 mb-2">使用说明：</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• 首先输入角色的基础属性数据</li>
            <li>• 添加多个内功方案，配置各项属性加成</li>
            <li>• 可以为每个方案添加特殊效果说明</li>
            <li>• 点击"计算对比"查看所有方案的收益排行</li>
            <li>• 系统会自动推荐收益最高的内功方案</li>
            <li>• 适用于内功选择、搭配优化等决策参考</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
