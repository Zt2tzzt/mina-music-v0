/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-02 20:18:13
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-01-06 21:18:19
 * @LastEditContent: 
 */
import { HYEventStore } from "hy-event-store";
import { getRankings } from "../service/api_music";

export const rankingNames = ["newRankings", "hotRankings", "originRankings", "upRankings"]
export const rankingStore = new HYEventStore({
	state: {
		newRankings: {}, // 0新歌榜
		hotRankings: {}, // 1热门榜
		originRankings: {}, // 2原创榜
		upRankings: {} // 3飙升榜
	},
	actions: {
		getRankingsDataAction(ctx) {
			for (let i = 0; i < 4; i++) {
				getRankings(i).then(res => {
					const rankingName = rankingNames[i]
					ctx[rankingName] = res.playlist
				})
			}
		}
	}
})