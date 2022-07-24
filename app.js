/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2021-12-27 09:20:30
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-27 16:28:26
 * @LastEditContent: 
 */
import { getLoginCode, codeToToken, checkToken, checkSession } from './service/api_login'
import { TOKEN_KEY } from './constants/index'
App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44
  },

  // ------------------------------------生命周期函数---------------------------------------

  onLaunch() {
    // 获取屏幕的长宽
    const info = wx.getSystemInfoSync();
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio

    // 让用户默认进行登录
    this.handleLogin()
  },

  // ------------------------------------自封装的函数---------------------------------------

  async lgoinAction() {
    // 1.获取code
    const code = await getLoginCode()
    // 2.将code发送给服务器
    const result = await codeToToken(code)
    const token = result.token
    wx.setStorageSync(TOKEN_KEY, token)
  },

  async handleLogin() {
    // 让用户默认进行登录
    const token = wx.getStorageSync(TOKEN_KEY)
    // 获取session是否过期
    const isSessionExpire = await checkSession()
    if (token && isSessionExpire) {
      // 发送请求，验证token有没有过期
      const checkResult = await checkToken()
      if (checkResult.errorCode) {
        this.lgoinAction()
      }
    } else {
      this.lgoinAction()
    }
  }

})
