/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-07 10:30:41
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-09 20:23:03
 * @LastEditContent: 
 */
import myRequest from "./index";

/**
 * @description: 此函数用于获取热门关键词，用于搜索页面
 * @Author: ZeT1an
 * @return {Promise} 返回封装的请求
 */
export const getSearchHot = () => {
	return myRequest.get('/search/hot')
}

/**
 * @description: 此函数用于获取搜索关键词联想，用于搜索页面
 * @Author: ZeT1an
 * @param {String} keywords 输入的关键字
 * @param {String} type 返回值适用于设备类型，如mobile
 * @return {Promise}  返回封装的请求
 */
export const getSearchSuggest = (keywords, type = 'mobile') => {
	return myRequest.get('/search/suggest', {
		keywords,
		type
	})
}

/**
 * @description: 此函数用于获取搜索关键词的结果，用于搜索页面
 * @Author: ZeT1an
 * @param {String} keywords 输入的关键字
 * @return {Promise} 返回封装的请求
 */
export const getSearchResult = (keywords) => {
	return myRequest.get('/search', {
		keywords
	})
}
