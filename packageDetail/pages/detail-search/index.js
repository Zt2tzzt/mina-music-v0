import { getSearchHot, getSearchSuggest, getSearchResult } from '../../../service/api_search'
import { playerStore } from '../../../store/index'
import debounce from '../../../utils/debounce'
import string2Nodes from '../../../utils/string2Nodes'
const debounceGetSearchSugest = debounce(getSearchSuggest, 500)
Page({

	data: {
		hotKeywords: [], // 服务器返回的热门关键字
		searchValue: "", // 搜索的关键字
		suggestSongs: [], // 根据搜索的关键字联想的歌曲
		suggestSongsNodes: [], // 用于富文本组件的关键字联想Nodes
		resultSongs: [], // 搜索结果
	},

	// ------------------------------------生命周期函数---------------------------------------

	onLoad: function () {
		this.getPageData()
	},

	// ------------------------------------事件回调函数---------------------------------------

	// 搜索框输入事件
	handleSearchChange(event) {
		// 1.获取输入的关键字
		const searchValue = event.detail
		// 2.保存关键字
		this.setData({ searchValue })
		// 3.判断关键字为空字符的处理逻辑
		if (!searchValue.length) {
			this.setData({
				suggestSongs: [],
				resultSongs: []
			})
			debounceGetSearchSugest.cancel()
			return
		}
		// 4.根据关键字进行搜索
		debounceGetSearchSugest(searchValue).then(res => {
			// 1.获取建议的关键字歌曲
			const suggestSongs = res.result.allMatch
			this.setData({ suggestSongs })

			// 2.转成nodes节点
			if (!suggestSongs) return
			const suggestKeywords = suggestSongs.map(item => item.keyword)
			const suggestSongsNodes = []
			suggestKeywords.forEach(keyword => {
				const nodes = string2Nodes(keyword, searchValue)
				suggestSongsNodes.push(nodes)
			});
			this.setData({ suggestSongsNodes })
		})
	},

	// 搜索框确认事件
	handleSearchAction() {
		const searchValue = this.data.searchValue
		getSearchResult(searchValue).then(res => {
			this.setData({ resultSongs: res.result.songs })
		})
	},

	// 热门关键词/联想关键词点击事件
	handleKeywordItemClick(event) {
		// 1.获取关键词
		const keyword = event.currentTarget.dataset.keyword
		// 2.将关键设置到searchValue中
		this.setData({ searchValue: keyword })
		// 3.发送网络请求
		this.handleSearchAction()
	},

	// 歌曲item点击事件
	handleSongItemClick(event) {
		const index = event.currentTarget.dataset.index
		playerStore.setState('playListSongs', this.data.resultSongs)
		playerStore.setState('playListIndex', index)
	},

	// ------------------------------------自封装的函数---------------------------------------

	getPageData() {
		getSearchHot().then(res => {
			this.setData({ hotKeywords: res.result.hots })
		})
	},

})