export default {
	onShow() {
		
	},
	onShareAppMessage() {
		return {
		  title: '首页',
		  path: '/pages/index/index'
		}
	},
	methods: {
		downloadImage() {
			// console.log(this.$downloadBase64Image)
			this.$downloadBase64Image(this.img)
		}
		// downLoad() {
		// 	uni.requestSubscribeMessage({
		// 		tmplIds: ["PdMGigfwjsZLNAdudrKEHATH1Lw5Ufwd4NTyCMrfE1A", "7QnQo1HQI3E0k2vb8RjCvX5uDjL0CDgmwC8_qW98Yns", "oFDDZWT6R8cIdSNlBZc7IpypfxNZ7hs6TmEVUz9bQEA"],
		// 		success: e => {
		// 			console.log(e)
		// 		}
		// 	})
		// }
	}
}