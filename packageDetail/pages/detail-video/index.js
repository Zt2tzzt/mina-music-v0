/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2021-12-28 18:34:47
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-20 17:40:02
 * @LastEditContent: 
 */
import { getMVURL, getMVDetail, getRelateVideo } from '../../../service/api_video'
Page({

  data: {
    mvURLInfo: {},
    mvDetail: {},
    relatedVideos: []
  },

  // ------------------------------------生命周期函数---------------------------------------

  onLoad: function (options) {
    // 1.获取传入的id
    const id = options.id
    // 2.获取页面的数据
    this.getPageData(id)
  },

  // ------------------------------------封装的函数---------------------------------------

  getPageData(id) {
    // 1.请求播放地址
    getMVURL(id).then(res => {
      this.setData({ mvURLInfo: res.data })
    })
    // 2.请求视频信息
    getMVDetail(id).then(res => {
      this.setData({ mvDetail: res.data })
    })
    // 3.请求相关视频
    getRelateVideo(id).then(res => {
      this.setData({ relatedVideos: res.data })
    })
  }

})