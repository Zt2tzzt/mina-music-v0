/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-18 18:31:30
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-04-20 09:50:09
 * @LastEditContent: 
 */
import { playerStore } from '../../store/index'
Component({

  /**
   * 组件的初始数据
   */
  data: {
    playAnimState: 'paused', // 是否有动画
    currentSong: {}, // 正在播放的歌曲
    isPlaying: false // 是否正在播放
  },

  lifetimes: {
    attached: function () {
      // 播放器监听
      playerStore.onStates(['isPlaying', 'currentSong'], this.handleMusicListener.bind(this))
    },
    detached: function () {
      playerStore.offStates(['isPlaying', 'currentSong'], this.handleMusicListener.bind(this))
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBarClick() {
      // 页面跳转
      wx.navigateTo({
        url: '/packagePlayer/pages/music-player/index?id=' + this.data.currentSong.id
      })
    },

    handlePlayBtnClick() {
      playerStore.dispatch('changeMusicPlayStatusAction', !this.data.isPlaying)
    },

    handleMusicListener({ isPlaying, currentSong }) {
      if (currentSong) this.setData({ currentSong })
      if (isPlaying !== undefined) {
        this.setData({
          isPlaying,
          playAnimState: isPlaying ? 'running' : 'paused'
        })
      }
    },
  }
})
