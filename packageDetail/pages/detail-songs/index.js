import { rankingStore, playerStore } from '../../../store/index'
import { getSongMenuDetail } from '../../../service/api_music'
Page({

  data: {
    type: "", // 歌单类型，menu: 用户建立的歌单, rank: 排行榜歌单
    ranking: "", // 排行榜歌单名称
    songInfo: {} // 用户建立的歌单顶部的详情
  },

  // ------------------------------------生命周期函数---------------------------------------

  onLoad: function (options) {
    const { type, id, ranking } = options
    this.setData({ type })
    if (type === 'menu') {
      // 用户创建的歌单
      getSongMenuDetail(id).then(res => {
        this.setData({ songInfo: res.playlist })
      })
    } else if (type === 'rank') {
      // 排行类型的歌单
      this.setData({ ranking })
      rankingStore.onState(ranking, this.getRankingDataHandle) // 在事件总线中获取事件
    }
  },

  onUnload() {
    if (this.data.ranking) {
      rankingStore.offState(this.data.ranking, this.getRankingDataHandle)
    }
  },

  // ------------------------------------事件处理函数---------------------------------------

  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playListSongs', this.data.songInfo.tracks)
    playerStore.setState('playListIndex', index)
  },

  // ------------------------------------自封装的函数---------------------------------------

  getRankingDataHandle(res) {
    this.setData({ songInfo: res })
  },
})