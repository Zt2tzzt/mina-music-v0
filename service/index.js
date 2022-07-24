import { BASE_URL, LOGIN_BASE_URL, TOKEN_KEY } from '../constants/index'

const token = wx.getStorageSync(TOKEN_KEY)

class MyRequest {
	constructor(baseURL, authHeader = {}) {
		this.baseURL = baseURL
		this.authHeader = authHeader
	}
	request(url, data, method, isAuth = false, header = {}) {
		const finalHeader = isAuth ? { ...this.authHeader, ...header } : header
		return new Promise((resolve, reject) => {
			wx.request({
				url: this.baseURL + url,
				data,
				header: finalHeader,
				method,
				dataType: 'json',
				responseType: 'text',
				success: (res) => {
					resolve(res.data)
				},
				fail: reject,
				complete: () => { }
			});
		})
	}

	get(url, param, isAuth, header) {
		return this.request(url, param, 'GET', isAuth, header)
	}

	post(url, data, isAuth, header) {
		return this.request(url, data, 'POST', isAuth, header)
	}
}

export default new MyRequest(BASE_URL)

export const myLoginRequest = new MyRequest(LOGIN_BASE_URL, { token })