/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-20 16:57:39
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-20 17:28:52
 * @LastEditContent: 
 */
import { getUserInfo } from '../../service/api_login'
Page({

  data: {

  },

  onLoad() {
  },

  async handleGetUserInfo() {
    const userInfo = await getUserInfo()
    console.log(userInfo);
  },

  handleGetPhoneNumber(event) {
    console.log(event);
  },
})