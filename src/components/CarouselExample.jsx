import React from 'react';
import CustomCarousel from './CustomCarousel';

const CarouselExample = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">优化后的轮播图示例</h1>

      {/* 使用自定义轮播图组件 */}
      <CustomCarousel />

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">轮播图优化技巧说明</h2>

        <h3 className="text-lg font-medium mb-2">核心优化原则</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>首屏仅加载当前显示的 1 张轮播图，其余图片先置空 / 用占位图</li>
          <li>利用轮播图的滑动事件，预加载下一张 / 下两张图片（滑动时无卡顿）</li>
          <li>非核心轮播图（如第 4、5 张）延迟加载（页面加载完成后再加载）</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">具体优化措施</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>资源预加载：</strong>在 index.html 中添加关键图片的预加载设置，提升首屏加载速度</li>
          <li><strong>懒加载策略：</strong>初始只加载第一张图片，其他图片根据需要动态加载</li>
          <li><strong>预加载相邻图片：</strong>轮播切换时，自动预加载相邻的图片，确保滑动流畅</li>
          <li><strong>延迟加载非核心图片：</strong>页面加载 2 秒后再加载第 4 张及以后的图片</li>
          <li><strong>图片缓存：</strong>使用 localStorage 缓存图片加载状态，刷新页面时避免重复加载</li>
          <li><strong>视觉优化：</strong>添加平滑的图片加载过渡效果，提升用户体验</li>
          <li><strong>错误处理：</strong>移除错误提示文字，保持视觉一致性</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">使用方法</h3>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
          {`import React from 'react';
import OptimizedCarousel from './OptimizedCarousel';

const HomePage = () => {
  return (
    <div>
      {/* 其他页面内容 */}
      <OptimizedCarousel />
      {/* 其他页面内容 */}
    </div>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export default CarouselExample;