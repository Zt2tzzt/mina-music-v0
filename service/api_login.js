import { myLoginRequest } from './index'

/**
 * @description: 此函数用于调用微信api，获取用户登录code
 * @Author: ZeT1an
 * @return {Promise} 返回封装的请求
 */
export const getLoginCode = () => {
	return new Promise((resolve, reject) => {
		wx.login({
			timeout: 1000,
			success: res => {
				const code = res.code
				resolve(code)
			},
			fail: reject
		})
	})
}

/**
 * @description: 此函数用于发送请求，获取后端返回的token
 * @Author: ZeT1an
 * @param {String} code 用户code
 * @return {Promise} 返回封装的请求
 */
export const codeToToken = (code) => {
	return myLoginRequest.post('/login', { code })
}

/**
 * @description: 此函数用于发送请求，获取后端对token的校验结果
 * @Author: ZeT1an
 * @param {String} token 用户token
 * @return {*} 返回封装的请求
 */
export const checkToken = () => {
	return myLoginRequest.post('/auth', {}, true)
}

/**
 * @description: 此函数用于调用微信api，检查用户session是否过期
 * @Author: ZeT1an
 * @return {Promise} 返回封装的请求
 */
export const checkSession = () => {
	return new Promise(resolve => {
		wx.checkSession({
			success: () => {
				resolve(true)
			},
			fail: () => {
				resolve(false)
			}
		})
	})
}

/**
 * @description: 此函数用于调用微信api，获取用户个人信息
 * @Author: ZeT1an
 * @return {Promise} 返回封装的请求
 */
export const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		wx.getUserProfile({
			desc: 'Hello Frog',
			success: resolve,
			fail: reject
		})
	})
}