/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2021-12-28 09:20:25
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-07 10:57:22
 * @LastEditContent: 
 */
import myRequest from "./index";

/**
 * @description: 此函数用于获取top mv数据，用于首页视频
 * @Author: ZeT1an
 * @param {Number} offset 从偏移量位置获取
 * @param {Number} offset 获取偏移量条数据
 * @return {Promise} 返回封装的请求
 */
export const getTopMvs = (offset, limit = 10) => {
	return myRequest.get('/top/mv', {
		offset,
		limit
	})
}

/**
 * @description: 此函数用于获取mv地址，用于视频详情页
 * @Author: ZeT1an
 * @param {Number} id 视频id
 * @return {Promise} 返回封装的请求
 */
export const getMVURL = (id) => {
	return myRequest.get('/mv/url', {
		id
	})
}

/**
 * @description: 此函数用于获取mv的数据，用于视频详情页
 * @Author: ZeT1an
 * @param {Number} mvid 视频id
 * @return {Promise} 返回的请求
 */
export const getMVDetail = (mvid) => {
	return myRequest.get('/mv/detail', {
		mvid
	})
}

/**
 * @description: 此函数用于获取相关视频数据，用于视频详情页
 * @Author: ZeT1an
 * @param {Number} id 视频id
 * @return {Promise} 返回的请求
 */
export const getRelateVideo = (id) => {
	return myRequest.get('/related/allvideo', {
		id
	})
}

