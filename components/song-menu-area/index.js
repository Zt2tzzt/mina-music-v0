/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-04 15:31:53
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-20 17:56:54
 * @LastEditContent: 
 */
// components/song-menu-area/index.js
Component({
  properties: {
    title: {
      type: String,
      value: '默认歌单'
    },
    songMenu: {
      type: Array,
      value: []
    }
  },

  data: {

  },

  methods: {
    handleMenuItemClick(event) {
      const { item } = event.currentTarget.dataset
      wx.navigateTo({
        url: `/packageDetail/pages/detail-songs/index?id=${item.id}&type=menu`
      })
    }
  }
})
