
/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-14 11:06:06
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-04-19 10:41:49
 * @LastEditContent: 
 */
import { HYEventStore } from "hy-event-store"
import { getSongDetail, getSongLyric } from '../service/api_player'
import { parseLyric } from '../utils/parse-lyric'

export const audioContext = wx.getBackgroundAudioManager()

export const playerStore = new HYEventStore({
	state: {
		id: 0,
		isFirstPlay: true, // 是否第一次播放
		isPlaying: false, // 歌曲是否正在播放
		isStoping: false, // 是否停止

		currentSong: {}, // 歌曲详情
		durationTime: 0, // 歌曲时长
		currentTime: 0, // 歌曲当前时间

		lyricInfos: {}, // 歌词信息
		currentLyricText: '', // 当前歌词对应文本
		currentLyricIndex: 0, // 当前歌词对应索引

		playModeIndex: 0, // 当前歌曲播放模式 0：循环播放 1：单曲循环 2：随机播放。
		playListSongs: [], // 当前播放列表
		playListIndex: 0, // 当前播放歌曲索引
	},
	actions: {
		playMusicWithSongIdAction(ctx, { id, isSingleCycle = false }) {
			// 处理同一首歌不需要重新播放
			if (ctx.id == id) {
				// 单曲循环模式且无操作，从头播放
				if (isSingleCycle) {
					audioContext.seek(0)
					return
				}
				// 进入播放页自动播放
				this.dispatch('changeMusicPlayStatusAction', true)
				return
			}

			ctx.id = id
			// 清空播放的状态
			ctx.isPlaying = true
			ctx.currentSong = {}
			ctx.durationTime = 0
			ctx.currentTime = 0
			ctx.lyricInfos = []
			ctx.currentLyricText = ''
			ctx.currentLyricIndex = 0
			// 根据id请求数据
			getSongDetail(id).then(res => {
				ctx.currentSong = res.songs[0]
				ctx.durationTime = res.songs[0].dt
				audioContext.title = res.songs[0].name
			})
			// 获取歌词
			getSongLyric(id).then(res => {
				const lyricString = res.lrc.lyric
				const lyricInfos = parseLyric(lyricString)
				ctx.lyricInfos = lyricInfos
			})

			// 创建播放器
			audioContext.stop()
			audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
			audioContext.title ||= id
			audioContext.autoplay = true

			// 监听audioContext的一些事件
			if (ctx.isFirstPlay) {
				this.dispatch("setupAudioContextListenerAction")
				ctx.isFirstPlay = false
			}
		},

		setupAudioContextListenerAction(ctx) {
			// 监听歌曲开始播放
			audioContext.onCanplay(() => {
				audioContext.play()
			})
			// 监听时间改变
			audioContext.onTimeUpdate(() => {
				// 1.获取当前时间
				const currentTime = audioContext.currentTime * 1000
				// 2.根据当前时间修改currentTime
				ctx.currentTime = currentTime
				// 3.根据当前时间去查找播放的歌词
				const lyricInfos = ctx.lyricInfos
				let index = lyricInfos.findIndex(ele => ele.time > currentTime);
				// 4.设置当前索引歌词的内容
				index = index === -1 ? lyricInfos.length : index
				const currentLyricIndex = index - 1
				if (ctx.currentLyricIndex !== currentLyricIndex) {
					const lyricInfo = ctx.lyricInfos[currentLyricIndex]
					ctx.currentLyricText = lyricInfo?.text
					ctx.currentLyricIndex = currentLyricIndex
				}
			})
			// 监听歌曲完成情况
			audioContext.onEnded(() => {
				this.dispatch('changeNewMusicAction')
			})
			// 监听音乐播放暂停停止
			audioContext.onPlay(() => {
				ctx.isPlaying = true
			})
			audioContext.onPause(() => {
				ctx.isPlaying = false
			})
			audioContext.onStop(() => {
				ctx.isPlaying = false
				ctx.isStoping = true
				audioContext.seek(0)
			})
			// 监听上一首/下一首
			audioContext.onNext(() => {
				this.dispatch('changeNewMusicAction', { isNext: true, isManual: true })
			})
			audioContext.onPrev(() => {
				this.dispatch('changeNewMusicAction', { isNext: false, isManual: true })
			})
		},

		changeMusicPlayStatusAction(ctx, isPlaying = true) {
			ctx.isPlaying = isPlaying
			// 从停止播放到播放状态。
			if (ctx.isPlaying && ctx.isStoping) {
				audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
				audioContext.title = ctx.currentSong.name
				audioContext.startTime = ctx.currentTime / 1000
				ctx.isStoping = false
			}
			ctx.isPlaying ? audioContext.play() : audioContext.pause()
		},

		changeNewMusicAction(ctx, { isNext = true, isManual = false } = {}) {
			// 计算播放歌曲索引值，加1/减1后小于0则赋max值，大于max值则赋0.
			const calcIndex = (i) => {
				i = isNext ? i + 1 : i - 1
				const lastIndex = ctx.playListSongs.length - 1
				return i < 0 ? lastIndex
					: i > lastIndex ? 0
						: i
			}
			// 1.获取当前索引
			let index = ctx.playListIndex
			// 2.根据不同的模仿模式，获取下一首歌的索引
			let isSingleCycle = false
			switch (ctx.playModeIndex) {
				case 0: // 循环播放
					index = calcIndex(index)
				case 1: // 单曲循环
					if (isManual)
						index = calcIndex(index)
					else
						isSingleCycle = true
					break
				case 2: // 随机播放
					index = Math.floor(Math.random() * ctx.playListSongs.length)
					break
			}
			// 3.获取歌曲
			let currentSong = ctx.playListSongs[index]
			if (currentSong)
				ctx.playListIndex = index
			else
				currentSong = ctx.currentSong
			// 4.请求新歌曲
			this.dispatch('playMusicWithSongIdAction', { id: currentSong.id, isSingleCycle })
		}
	}
})
