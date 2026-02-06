class MusicPlayer {
  constructor() {
    if (MusicPlayer.instance) {
      return MusicPlayer.instance;
    }

    this.audioElement = null;
    this.isPlaying = false;
    this.isInitialized = false;
    this.musicPath = '/music/小黄黄 - 水龙吟 (Live)_L.ogg';
    this.loading = false;
    this.error = null;

    MusicPlayer.instance = this;
  }

  // 初始化播放器
  init() {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;
    this.createAudioElement();
    this.loadMusic();
    this.loadPlaybackState();
  }

  // 创建音频元素
  createAudioElement() {
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.audioElement.preload = 'auto';
    this.audioElement.crossOrigin = 'anonymous';

    // 监听播放事件
    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.savePlaybackState();
    });

    // 监听暂停事件
    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.savePlaybackState();
    });

    // 监听错误事件
    this.audioElement.addEventListener('error', (error) => {
      console.error('音乐加载错误:', error);
      this.error = error;
      this.loading = false;
    });

    // 监听加载完成事件
    this.audioElement.addEventListener('canplaythrough', () => {
      this.loading = false;
      // 如果之前是播放状态，自动恢复播放
      if (this.getSavedPlaybackState()) {
        this.play();
      }
    });
  }

  // 加载音乐
  loadMusic() {
    if (!this.audioElement) {
      this.createAudioElement();
    }

    this.loading = true;
    this.audioElement.src = this.musicPath;
    // 预加载
    this.audioElement.load();
  }

  // 播放音乐
  async play() {
    if (!this.audioElement) {
      this.init();
    }

    try {
      await this.audioElement.play();
      this.isPlaying = true;
      this.savePlaybackState();
    } catch (error) {
      console.log('播放被阻止，需要用户交互:', error);
      this.error = error;
    }
  }

  // 暂停音乐
  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.savePlaybackState();
    }
  }

  // 切换播放状态
  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // 获取播放状态
  getIsPlaying() {
    return this.isPlaying;
  }

  // 获取加载状态
  getLoading() {
    return this.loading;
  }

  // 获取错误信息
  getError() {
    return this.error;
  }

  // 保存播放状态到localStorage
  savePlaybackState() {
    try {
      localStorage.setItem('musicPlayerState', JSON.stringify({
        isPlaying: this.isPlaying,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('保存播放状态失败:', error);
    }
  }

  // 从localStorage加载播放状态
  loadPlaybackState() {
    try {
      const savedState = localStorage.getItem('musicPlayerState');
      if (savedState) {
        const state = JSON.parse(savedState);
        // 检查状态是否在最近24小时内
        const now = Date.now();
        if (now - state.timestamp < 24 * 60 * 60 * 1000) {
          return state.isPlaying;
        }
      }
    } catch (error) {
      console.error('加载播放状态失败:', error);
    }
    return false;
  }

  // 获取保存的播放状态
  getSavedPlaybackState() {
    return this.loadPlaybackState();
  }

  // 销毁播放器
  destroy() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement = null;
    }
    this.isPlaying = false;
    this.isInitialized = false;
    this.loading = false;
    this.error = null;
  }
}

// 导出单例实例
const musicPlayer = new MusicPlayer();
export default musicPlayer;