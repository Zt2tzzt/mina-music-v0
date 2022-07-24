/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2021-12-27 10:03:52
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-21 15:12:54
 * @LastEditContent: 
 */
import { getBanners, getSongMenu } from "../../service/api_music";
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
import { rankingStore, rankingNames, playerStore } from '../../store/index'

const throttleQueryRect = throttle(queryRect, 1000, { trailling: true })

// pages/home-music/index.js
Page({

	data: {
		swiperHeight: 0, // swpier高度
		banners: [], // 轮播图
		recommendSongs: [], // 推荐歌曲列表
		hotSongMenu: [], // 热门歌单
		recommendSongMenu: [], // 推荐歌单
		rankings: { 0: {}, 2: {}, 3: {} }, // 飙升榜数据，0新歌榜，2原创榜，3飙升榜，
	},

	// ------------------------------------生命周期函数---------------------------------------

	onLoad() {
		// 获取页面数据
		this.getPageData()

		// 发起共享数据的请求
		rankingStore.dispatch('getRankingsDataAction')

		// 从store获取共享数据
		this.setupPlayerStoreListener()
	},

	onUnload() {
		rankingStore.offState('hotRankings', this.getRecommendHandler)
		rankingStore.offState("newRankings", this.getRankingHandler(0))
		rankingStore.offState("originRankings", this.getRankingHandler(2))
		rankingStore.offState("upRankings", this.getRankingHandler(3))
	},

	// ------------------------------------事件回调函数---------------------------------------

	// 搜索框点击事件
	handleSearchClick() {
		wx.navigateTo({
			url: '/packageDetail/pages/detail-search/index'
		});
	},

	// swiper中图片加载完成的回调事件
	handleSwiperImageLoaded() {
		throttleQueryRect('.swiper-image').then(res => {
			this.setData({ swiperHeight: res[0].height })
		})
	},

	// 推荐歌曲右侧“更多”按钮点击事件
	handlleRecommendMoreClick() {
		const rankingName = rankingNames[1]
		this.navigateToDetailSongsPage(rankingName)
	},

	// 巅峰榜item点击事件
	handleRankingItemClick(event) {
		const idx = event.currentTarget.dataset.idx
		const rankingName = rankingNames[idx]
		this.navigateToDetailSongsPage(rankingName)
	},

	// 推荐歌曲item被点击
	handleSongItemClick(event) {
		const index = event.currentTarget.dataset.index
		playerStore.setState('playListSongs', this.data.recommendSongs)
		playerStore.setState('playListIndex', index)
	},

	// ------------------------------------自封装的函数---------------------------------------

	getPageData() {
		getBanners().then(res => {
			// setData在设置data数据上, 是同步的，通过最新的数据对wxml进行渲染, 渲染的过程是异步
			this.setData({ banners: res.banners })
		})
		getSongMenu().then(res => {
			this.setData({ hotSongMenu: res.playlists })
		})
		getSongMenu('华语').then(res => {
			this.setData({ recommendSongMenu: res.playlists })
		})
	},

	getRecommendHandler(res) {
		if (!res.tracks) return
		// this.setData({ recommendSongs: res.tracks.slice(0, 6) })
		this.setData({ recommendSongs: res.tracks })
	},

	getRankingHandler(idx) {
		return (res) => {
			if (!Object.keys(res).length) return
			const rankings = { ...this.data.rankings, [idx]: res }
			this.setData({ rankings })
		}
	},

	navigateToDetailSongsPage(rankingName) {
		wx.navigateTo({
			url: `/packageDetail/pages/detail-songs/index?ranking=${rankingName}&type=rank`
		})
	},

	setupPlayerStoreListener() {
		// 从store获取共享的数据
		rankingStore.onState('hotRankings', this.getRecommendHandler)
		rankingStore.onState("newRankings", this.getRankingHandler(0))
		rankingStore.onState("originRankings", this.getRankingHandler(2))
		rankingStore.onState("upRankings", this.getRankingHandler(3))
	},
})