import React, { useState } from 'react';
import { Shield, Users, Calculator, TrendingUp, BarChart3, Sword } from 'lucide-react';

const Defense = () => {
  const [teamStats, setTeamStats] = useState({
    memberCount: '',
    avgAttack: '',
    avgDefense: '',
    avgHealth: '',
    avgCritRate: '',
    avgCritDamage: ''
  });

  const [skillConfig, setSkillConfig] = useState({
    teamAttackBonus: 0,
    teamDefenseBonus: 0,
    teamHealthBonus: 0,
    teamCritRateBonus: 0,
    teamCritDamageBonus: 0,
    synergy: 0
  });

  const [results, setResults] = useState(null);

  const handleTeamStatsChange = (field, value) => {
    setTeamStats(prev => ({
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

  const calculateTeamBenefit = () => {
    const stats = {
      memberCount: parseInt(teamStats.memberCount) || 0,
      avgAttack: parseFloat(teamStats.avgAttack) || 0,
      avgDefense: parseFloat(teamStats.avgDefense) || 0,
      avgHealth: parseFloat(teamStats.avgHealth) || 0,
      avgCritRate: parseFloat(teamStats.avgCritRate) || 0,
      avgCritDamage: parseFloat(teamStats.avgCritDamage) || 0
    };

    if (stats.memberCount === 0) {
      alert('请输入团队成员数量');
      return;
    }

    // 计算团队总属性
    const totalStats = {
      attack: stats.avgAttack * stats.memberCount,
      defense: stats.avgDefense * stats.memberCount,
      health: stats.avgHealth * stats.memberCount,
      critRate: stats.avgCritRate,
      critDamage: stats.avgCritDamage
    };

    // 计算内功加成后的团队属性
    const enhancedStats = {
      attack: totalStats.attack * (1 + skillConfig.teamAttackBonus / 100),
      defense: totalStats.defense * (1 + skillConfig.teamDefenseBonus / 100),
      health: totalStats.health * (1 + skillConfig.teamHealthBonus / 100),
      critRate: Math.min(100, totalStats.critRate + skillConfig.teamCritRateBonus),
      critDamage: totalStats.critDamage + skillConfig.teamCritDamageBonus
    };

    // 团队协同加成
    const synergyMultiplier = 1 + (skillConfig.synergy / 100);
    enhancedStats.attack *= synergyMultiplier;
    enhancedStats.defense *= synergyMultiplier;

    // 计算团队战斗力
    const originalPower = calculateTeamCombatPower(totalStats);
    const enhancedPower = calculateTeamCombatPower(enhancedStats);
    const powerIncrease = enhancedPower - originalPower;
    const percentageIncrease = ((powerIncrease / originalPower) * 100).toFixed(2);

    // 计算每个成员的平均收益
    const avgMemberBenefit = {
      attack: (enhancedStats.attack - totalStats.attack) / stats.memberCount,
      defense: (enhancedStats.defense - totalStats.defense) / stats.memberCount,
      health: (enhancedStats.health - totalStats.health) / stats.memberCount,
      critRate: enhancedStats.critRate - totalStats.critRate,
      critDamage: enhancedStats.critDamage - totalStats.critDamage
    };

    setResults({
      original: totalStats,
      enhanced: enhancedStats,
      teamIncrease: {
        attack: enhancedStats.attack - totalStats.attack,
        defense: enhancedStats.defense - totalStats.defense,
        health: enhancedStats.health - totalStats.health,
        critRate: enhancedStats.critRate - totalStats.critRate,
        critDamage: enhancedStats.critDamage - totalStats.critDamage
      },
      avgMemberBenefit,
      powerIncrease,
      percentageIncrease,
      memberCount: stats.memberCount
    });
  };

  const calculateTeamCombatPower = (stats) => {
    // 团队战斗力计算公式
    const basePower = stats.attack * 1.5 + stats.defense * 1.2 + stats.health * 0.15;
    const critMultiplier = 1 + (stats.critRate / 100) * (stats.critDamage / 100);
    
    return basePower * critMultiplier;
  };

  const clearData = () => {
    setTeamStats({
      memberCount: '',
      avgAttack: '',
      avgDefense: '',
      avgHealth: '',
      avgCritRate: '',
      avgCritDamage: ''
    });
    setSkillConfig({
      teamAttackBonus: 0,
      teamDefenseBonus: 0,
      teamHealthBonus: 0,
      teamCritRateBonus: 0,
      teamCritDamageBonus: 0,
      synergy: 0
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">PVP防守团内功收益计算</h1>
            </div>
            <button
              onClick={clearData}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Users className="h-4 w-4 mr-2" />
              清空数据
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 团队属性输入 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                团队基础数据
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">团队成员数量</label>
                  <input
                    type="number"
                    value={teamStats.memberCount}
                    onChange={(e) => handleTeamStatsChange('memberCount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入团队成员数量"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">平均攻击力</label>
                  <input
                    type="number"
                    value={teamStats.avgAttack}
                    onChange={(e) => handleTeamStatsChange('avgAttack', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="团队平均攻击力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">平均防御力</label>
                  <input
                    type="number"
                    value={teamStats.avgDefense}
                    onChange={(e) => handleTeamStatsChange('avgDefense', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="团队平均防御力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">平均生命值</label>
                  <input
                    type="number"
                    value={teamStats.avgHealth}
                    onChange={(e) => handleTeamStatsChange('avgHealth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="团队平均生命值"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">平均暴击率 (%)</label>
                  <input
                    type="number"
                    value={teamStats.avgCritRate}
                    onChange={(e) => handleTeamStatsChange('avgCritRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="团队平均暴击率"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">平均暴击伤害 (%)</label>
                  <input
                    type="number"
                    value={teamStats.avgCritDamage}
                    onChange={(e) => handleTeamStatsChange('avgCritDamage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="团队平均暴击伤害"
                  />
                </div>
              </div>
            </div>

            {/* 团队内功配置 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-green-600" />
                团队内功加成
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">团队攻击加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.teamAttackBonus}
                    onChange={(e) => handleSkillChange('teamAttackBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">团队防御加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.teamDefenseBonus}
                    onChange={(e) => handleSkillChange('teamDefenseBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">团队生命加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.teamHealthBonus}
                    onChange={(e) => handleSkillChange('teamHealthBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">团队暴击率加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.teamCritRateBonus}
                    onChange={(e) => handleSkillChange('teamCritRateBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">团队暴伤加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.teamCritDamageBonus}
                    onChange={(e) => handleSkillChange('teamCritDamageBonus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">团队协同加成 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={skillConfig.synergy}
                    onChange={(e) => handleSkillChange('synergy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.0"
                  />
                </div>
              </div>
              
              <button
                onClick={calculateTeamBenefit}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                计算团队收益
              </button>
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
              团队收益分析结果
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 团队总属性提升 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">团队总属性提升</h3>
                <div className="space-y-3">
                  {[
                    { key: 'attack', label: '总攻击力', color: 'text-red-600' },
                    { key: 'defense', label: '总防御力', color: 'text-blue-600' },
                    { key: 'health', label: '总生命值', color: 'text-green-600' },
                    { key: 'critRate', label: '暴击率', color: 'text-yellow-600' },
                    { key: 'critDamage', label: '暴击伤害', color: 'text-purple-600' }
                  ].map(({ key, label, color }) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">{label}</span>
                      <div className="text-right">
                        <div className={`font-semibold ${color}`}>
                          +{Math.round(results.teamIncrease[key])}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 单人平均收益 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">单人平均收益</h3>
                <div className="space-y-3">
                  {[
                    { key: 'attack', label: '攻击力', color: 'text-red-600' },
                    { key: 'defense', label: '防御力', color: 'text-blue-600' },
                    { key: 'health', label: '生命值', color: 'text-green-600' },
                    { key: 'critRate', label: '暴击率', color: 'text-yellow-600' },
                    { key: 'critDamage', label: '暴击伤害', color: 'text-purple-600' }
                  ].map(({ key, label, color }) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">{label}</span>
                      <div className="text-right">
                        <div className={`font-semibold ${color}`}>
                          +{Math.round(results.avgMemberBenefit[key])}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 团队战斗力提升 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">团队战斗力</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      +{Math.round(results.powerIncrease)}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">团队战斗力提升</div>
                    <div className="text-xl font-semibold text-purple-600">
                      {results.percentageIncrease}%
                    </div>
                    <div className="text-xs text-gray-500">提升百分比</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {results.memberCount}人团队
                    </div>
                    <div className="text-sm text-green-700">
                      人均战力提升: +{Math.round(results.powerIncrease / results.memberCount)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">团队收益评估：</h4>
                  <p className="text-yellow-700 text-sm">
                    {parseFloat(results.percentageIncrease) >= 15 
                      ? '🔥 团队收益极佳，强烈推荐此内功配置'
                      : parseFloat(results.percentageIncrease) >= 8
                      ? '✅ 团队收益良好，推荐使用此内功配置'
                      : '⚠️ 团队收益一般，可考虑其他内功配置'
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
            <li>• 输入团队成员数量和平均属性数据</li>
            <li>• 配置团队内功的各项加成数值</li>
            <li>• 团队协同加成会额外提升攻击力和防御力</li>
            <li>• 适用于帮战防守、团队PVP等场景的内功选择</li>
            <li>• 重点关注团队总收益和人均收益的平衡</li>
            <li>• 建议测试多种内功组合，找到最适合团队的配置</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Defense;
