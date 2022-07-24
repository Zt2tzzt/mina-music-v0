/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-11 17:03:09
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-15 20:23:27
 * @LastEditContent: 
 */
const globalData = getApp().globalData
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '默认标题'
    }
  },

  data: {
    statusBarHeight: globalData.statusBarHeight,
    navBarHeight: globalData.navBarHeight
  },

  methods: {
    handleBackArrowClick() {
      this.triggerEvent('click')
    },
  }
})
