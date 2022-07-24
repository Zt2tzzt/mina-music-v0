/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-02 19:36:29
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-31 18:29:59
 * @LastEditContent: 
 */
// components/area-header/index.js
Component({
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },
    rightText: {
      type: String,
      value: '更多'
    },
    showRight: {
      type: Boolean,
      value: true
    }
  },

  data: {

  },

  methods: {
    handleRightClick() {
      this.triggerEvent('click')
    },
  }
})
