// 正则（regular）表达式（expression）：字符串匹配利器
// 定义一个正则表达式匹配时间
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export const parseLyric = (lyricString) => {
	const lyricStrings = lyricString.split('\n')
	const lyricInfo = []
	lyricStrings.forEach(lyrStr => {
		const timeResult = timeRegExp.exec(lyrStr)
		if (timeResult) {
			// 1.获取时间
			const minute = timeResult[1] * 60 * 1000
			const second = timeResult[2] * 1000
			const millsecondTime = timeResult[3]
			const millscond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime * 1
			const time = minute + second + millscond
			// 2.获取歌词文
			const text = lyrStr.replace(timeRegExp, "")
			lyricInfo.push({ time, text })
		}
	});
	return lyricInfo
}