// 数据解析工具函数
export const parseWeChatChainData = (rawData) => {
  try {
    // 移除多余的空格和换行符
    const cleanData = rawData.trim();
    
    // 按行分割数据
    const lines = cleanData.split('\n').filter(line => line.trim());
    
    const parsedData = [];
    
    lines.forEach((line, index) => {
      // 解析每一行数据，支持多种格式
      const parts = line.split(/\s+/).filter(part => part.trim());
      
      if (parts.length >= 3) {
        const item = {
          id: index + 1,
          playerId: parts[0] || '',
          position: parts[1] || '',
          profession: parts[2] || '',
          yixianqian: parts[3] || '未绑定'
        };
        parsedData.push(item);
      }
    });
    
    return parsedData;
  } catch (error) {
    console.error('数据解析失败:', error);
    return [];
  }
};

// 复制到剪贴板功能
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('复制失败:', error);
    // 降级方案
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};
