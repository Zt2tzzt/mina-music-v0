/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2021-12-31 16:44:47
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-11 16:32:52
 * @LastEditContent: 
 */
import myRequest from "./index";

/**
 * @description: 此函数用于获取轮播图数据（type=2，数用于iphone），用于音乐首页。
 * @Author: ZeT1an
 * @param {*}
 * @return {Promise} 返回封装的请求。
 */
export const getBanners = () => {
	return myRequest.get('/banner', {
		type: 2
	})
}

/**
 * @description: 此函数用于获取歌曲排行数据。
 * @Author: ZeT1an
 * @param {Number} idx 排行类型 0 飙升，1 热门，2 新歌，3 原创。
 * @return {Promise} 返回封装的请求。
 */
export const getRankings = (idx) => {
	return myRequest.get('/top/list', {
		idx
	})
}

/**
 * @description: 此函数用于获取歌单数据。
 * @Author: ZeT1an
 * @param {String} cat 目录类型，比如 "华语"、"古风"、"欧美"、"流行",默认为"全部"。
 * @param {Number} limit 取出歌单数量，默认为6。
 * @param {Number} offset 偏移数量，用于分页。
 * @return {Promise} 
 */
export const getSongMenu = (cat = "全部", limit = 6, offset = 0) => {
	return myRequest.get('/top/playlist', {
		cat,
		limit,
		offset
	})
}

/**
 * @description: 此函数用于获取歌单详情信息。
 * @Author: ZeT1an
 * @param {String} id 歌单的Id。
 * @return {Promise} 返回封装的请求。
 */
export const getSongMenuDetail = (id) => {
	return myRequest.get('/playlist/detail/dynamic', {
		id
	})
}
