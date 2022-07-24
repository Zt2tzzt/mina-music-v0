/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-09 21:21:18
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-20 21:31:41
 * @LastEditContent: 
 */
import { audioContext, playerStore } from '../../../store/index'

const playModeNames = ['order', 'repeat', 'random']
Page({

  data: {
    id: 0, // 歌曲id
    playModeIndex: 0, // 当前歌曲播放模式 0：循环播放 1：单曲循环 2：随机播放。
    playModeName: 'order', // 当前歌曲播放模式名称
    playingName: 'pause', // 当前歌曲播放状态

    currentSong: {}, // 歌曲详情
    durationTime: 0, // 歌曲时长
    lyricInfos: [], // 歌词信息
    currentTime: 0, // 当前歌曲播放时间
    currentLyricIndex: 0, // 当前歌词对应索引
    currentLyricText: '', // 当前歌词对应文本

    currentPage: 0, // 当前页数
    contentHeight: 0, // swiper内容高度
    isMusicLyric: true, // 封面下歌词是否显示
    isSliderChanging: false, // 滑块是否在拖拽
    sliderValue: 0, // 滑块位置

    lyricScrollTop: 0, // 第2页外层scroll-view高度

  },

  // ------------------------------------生命周期函数---------------------------------------

  onLoad: function (options) {
    // 1.获取传入的id
    const id = options.id
    this.setData({ id })

    // 2.根据id获取歌曲信息
    this.setPlayerStorelistener()

    // 3.动态计算内容高度
    const { screenHeight, statusBarHeight, navBarHeight, deviceRadio } = getApp().globalData
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({ contentHeight, isMusicLyric: deviceRadio >= 2 })
  },

  onUnload() {
    // 取消监听
    playerStore.offStates(['currentSong', 'durationTime', 'lyricInfos'], this.handleCurrentMusicInfoListener)
    playerStore.offStates(['currentTime', 'currentLyricText', 'currentLyricIndex'], this.handleCurrentMusicTimeListener)
    playerStore.offStates(['isPlaying', 'playModeIndex'],this.handlePlayStateListener)

  },

  // ------------------------------------事件处理函数---------------------------------------

  // 页面滑动
  handleSwiperChange(event) {
    const current = event.detail.current
    this.setData({ currentPage: current })
  },

  // 进度条拖动
  handleSliderChanging(event) {
    const sliderValue = event.detail.value
    const currentTime = this.data.durationTime * sliderValue / 100
    this.setData({
      isSliderChanging: true,
      currentTime
    })
  },

  // 进度条改变
  handleSliderChange(event) {
    // 1.获取slider变化的值
    const sliderValue = event.detail.value
    // 2.计算需要播放的currentTime
    const currentTime = this.data.durationTime * sliderValue / 100
    // 3.设置context播放currentTime位置的音乐
    // audioContext.pause()
    audioContext.seek(currentTime / 1000)
    // 4.记录最新的sliderValue, 并且需要将isSliderChanging设置会false
    this.setData({
      sliderValue,
      isSliderChanging: false
    })
  },

  // 切换播放模式
  handleModeBtnClick() {
    // 计算最新的playModeIndex
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex > 2) playModeIndex = 0
    // 设置playStore中的playModeIndex
    playerStore.setState('playModeIndex', playModeIndex)
  },

  // 暂停/播放
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },

  // 页面回退
  handleBackBtnClick: function () {
    wx.navigateBack()
  },

  // 上一首
  handlePrevBtnClick() {
    playerStore.dispatch('changeNewMusicAction', { isNext: false, isManual: true })
  },

  // 下一首
  handleNextBtnClick() {
    playerStore.dispatch('changeNewMusicAction', { isNext: true, isManual: true })
  },

  // ------------------------------------自封装的函数---------------------------------------

  setPlayerStorelistener() {
    // 监听currentSong/durationTime/lyricInfo
    playerStore.onStates(['currentSong', 'durationTime', 'lyricInfos'], this.handleCurrentMusicInfoListener)
    // 监听currentTime/currentLyricText/currentLyricIndex
    playerStore.onStates(['currentTime', 'currentLyricText', 'currentLyricIndex'], this.handleCurrentMusicTimeListener)
    // 监听歌曲播放模式相关的数据
    playerStore.onStates(['isPlaying', 'playModeIndex'], this.handlePlayStateListener)
  },

  handleCurrentMusicInfoListener({ currentSong, durationTime, lyricInfos }) {
    if (currentSong) this.setData({ currentSong })
    if (durationTime) this.setData({ durationTime })
    if (lyricInfos) this.setData({ lyricInfos })
  },

  handleCurrentMusicTimeListener({ currentTime, currentLyricText, currentLyricIndex }) {
    if (currentTime && !this.data.isSliderChanging) {
      const sliderValue = currentTime / this.data.durationTime * 100
      this.setData({ currentTime, sliderValue })
    }
    if (currentLyricIndex) {
      this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
    }
    if (currentLyricText) {
      this.setData({ currentLyricText })
    }
  },

  handlePlayStateListener({ isPlaying, playModeIndex }) {
    if (playModeIndex !== undefined) {
      this.setData({
        playModeIndex,
        playModeName: playModeNames[playModeIndex]
      })
    }

    if (isPlaying !== undefined) {
      this.setData({
        isPlaying,
        playingName: isPlaying ? 'pause' : 'resume'
      })
    }
  },

})

