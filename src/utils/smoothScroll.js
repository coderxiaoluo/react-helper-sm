/**
 * 平滑滚动工具函数
 * 支持页面内部锚点跳转和平滑过渡效果
 */

/**
 * 平滑滚动到指定元素
 * @param {HTMLElement} element - 目标元素
 * @param {number} offset - 滚动偏移量（考虑导航栏高度）
 * @param {number} duration - 滚动持续时间（毫秒）
 */
export const smoothScrollTo = (element, offset = 0, duration = 600) => {
  if (!element) return;

  const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = elementTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  // 缓动函数：cubic-bezier(0.25, 0.1, 0.25, 1.0)
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const scrollAnimation = (currentTime) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  };

  requestAnimationFrame(scrollAnimation);
};

/**
 * 平滑滚动到指定锚点
 * @param {string} anchorId - 锚点ID
 * @param {number} offset - 滚动偏移量
 * @param {number} duration - 滚动持续时间
 */
export const smoothScrollToAnchor = (anchorId, offset = 0, duration = 600) => {
  const element = document.getElementById(anchorId);
  if (element) {
    smoothScrollTo(element, offset, duration);
  }
};

/**
 * 处理锚点链接点击事件
 * @param {Event} e - 点击事件
 * @param {number} offset - 滚动偏移量
 * @param {number} duration - 滚动持续时间
 * @returns {boolean} - 是否是锚点链接
 */
export const handleAnchorClick = (e, offset = 0, duration = 600) => {
  const target = e.target.closest('a');
  
  if (target && target.getAttribute('href')?.startsWith('#')) {
    e.preventDefault();
    const anchorId = target.getAttribute('href').substring(1);
    smoothScrollToAnchor(anchorId, offset, duration);
    return true;
  }
  
  return false;
};

/**
 * 添加页面过渡效果
 * @param {HTMLElement} container - 容器元素
 */
export const addPageTransition = (container) => {
  if (!container) return;
  
  // 页面进入动画
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  
  // 触发重排
  container.offsetHeight;
  
  // 应用动画
  container.style.opacity = '1';
  container.style.transform = 'translateY(0)';
};