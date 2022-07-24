/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-11 16:33:26
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-14 11:20:27
 * @LastEditContent: 
 */
import myRequest from "./index";

export const getSongDetail = (ids) => {
	return myRequest.get('/song/detail', {
		ids
	})
}

export const getSongLyric = (id) => {
return myRequest.get('/lyric', {
	id
})
}