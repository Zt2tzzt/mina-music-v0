/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-02 20:42:23
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-20 17:58:20
 * @LastEditContent: 
 */
import { playerStore } from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSongItemClick() {
      const id = this.properties.item.id
      // 页面跳转
      wx.navigateTo({
        url: '/packagePlayer/pages/music-player/index?id=' + id
      })
      // 对歌曲的数据请求和其它操作
      playerStore.dispatch("playMusicWithSongIdAction", { id })
    }
  }
})
