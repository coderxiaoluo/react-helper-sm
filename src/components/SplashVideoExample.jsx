import React, { useState } from 'react';
import SplashVideo from './SplashVideo';

const SplashVideoExample = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* 开屏视频 */}
      {showSplash && (
        <SplashVideo
          onComplete={handleSplashComplete}
        // 可以自定义视频路径和封面路径
        // videoPath="/video/splash.mp4"
        // coverPath="/images/splash/splash_cover.jpg"
        />
      )}

      {/* 主页面内容 */}
      {!showSplash && (
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">开屏视频示例</h1>

          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">开屏视频组件使用说明</h2>

            <h3 className="text-xl font-medium mb-4">目录结构</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              {`public/
├─ video/
│  └─ splash.mp4  # 压缩后的6秒开屏视频（核心）
└─ images/
   └─ splash/
      └─ splash_cover.jpg   # 封面兜底（JPG）`}
            </pre>

            <h3 className="text-xl font-medium mb-4">使用方法</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              {`import React, { useState } from 'react';
import SplashVideo from './components/SplashVideo';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div>
      {/* 开屏视频 */}
      {showSplash && (
        <SplashVideo
          onComplete={handleSplashComplete}
          // 自定义视频路径（可选）
          videoPath="/video/splash.mp4"
          // 自定义封面路径（可选）
          coverPath="/images/splash/splash_cover.jpg"
        />
      )}

      {/* 主页面内容 */}
      {!showSplash && (
        <div>
          {/* 你的应用内容 */}
        </div>
      )}
    </div>
  );
};`}
            </pre>

            <h3 className="text-xl font-medium mb-4">核心功能</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>自动播放：</strong>满足浏览器自动播放规则，无需用户交互</li>
              <li><strong>静音播放：</strong>默认静音，避免突然的声音干扰</li>
              <li><strong>彻底消除黑屏：</strong>使用封面图作为兜底，视频加载过程中显示封面</li>
              <li><strong>播放完隐藏：</strong>视频播放结束后自动隐藏</li>
              <li><strong>加载兜底：</strong>视频加载失败时自动隐藏，显示主页面</li>
              <li><strong>跳过功能：</strong>用户可以点击跳过按钮直接进入主页面</li>
              <li><strong>适配移动端：</strong>支持移动端全屏显示和触摸操作</li>
            </ul>

            <h3 className="text-xl font-medium mb-4">优化建议</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>视频长度控制在6秒以内，确保快速加载和播放</li>
              <li>视频文件大小建议控制在2MB以下，使用H.264编码</li>
              <li>封面图建议使用视频的第一帧，保持视觉一致性</li>
              <li>在index.html中添加视频预加载，提升加载速度</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashVideoExample;