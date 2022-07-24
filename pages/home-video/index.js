/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2021-12-27 10:04:10
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-04-05 11:04:58
 * @LastEditContent: 
 */
/**
 * 小程序灰度中含义，基础库选择
 *  少量用户测试中，没有进行全量发布
 */
import { getTopMvs } from '../../service/api_video'
Page({
	data: {
		topMVs: [],
		hasMore: true
	},

	// ------------------------------------生命周期函数---------------------------------------

	onLoad() {
		this.getTopMVData(0)
	},

	// 上拉刷新
	onPullDownRefresh() {
		this.getTopMVData(0)
	},

	// 触底加载更多
	onReachBottom() {
		this.getTopMVData(this.data.topMVs.length)
	},

	// ------------------------------------事件回调函数---------------------------------------

	handleVideoItemClick(event) {
		// 获取视频id
		const id = event.currentTarget.dataset.aaa.id
		// 页面跳转
		wx.navigateTo({
			url: '/packageDetail/pages/detail-video/index?id=' + id,
		});
	},

	// ------------------------------------封装的函数---------------------------------------

	async getTopMVData(offset) {
		// 判断是否可以请求
		if (!this.data.hasMore) return
		wx.showNavigationBarLoading(); // 展示刷新动画
		// 发送请求
		const res = await getTopMvs(offset)
		let topMVs = offset ? this.data.topMVs.concat(res.data) : res.data
		// 设值数据
		this.setData({
			topMVs,
			hasMore: res.hasMore
		})
		wx.hideNavigationBarLoading();
		wx.stopPullDownRefresh()
	}
});