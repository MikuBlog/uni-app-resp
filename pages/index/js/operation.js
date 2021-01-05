import { isios } from '@/utils/system'
import { encrypt, decrypt }  from '@/utils/encrypt.js'
export default {
	onShow() {
		console.log(isios())
	},
	onShareAppMessage() {
		return {
			title: '首页',
			path: '/pages/index/index'
		}
	},
	methods: {
		uploadVideo() {
			// console.log(123)
			// uni.chooseVideo({
			// 	count: 1,
			// 	sourceType: ['camera', 'album'],
			// 	success: function(res) {
			// 		console.log(res)
			// 		self.src = res.tempFilePath;
			// 	},
			// 	fail: e=> {
			// 		console.log(e)
			// 	},
			// 	complete: e => {
			// 		console.log(123)
			// 	}
			// })
			// console.log(1423)
			
			this
				.$getFile(100, 1, 'video/*')
				.then(result => {
					this.$http_file({
						url: "/api/localStorage/upload",
						method: "post",
						data: {
							file: result[0]
						}
					}).then(result => {

					})
				})
		}
	}
}
