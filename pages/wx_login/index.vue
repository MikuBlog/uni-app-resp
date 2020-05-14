<template>
	<view class="login">
		<image class="background" src="../../static/login_bg.png" mode="aspectFill"></image>
		<button class="login-button" type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">
			<image src="../../static/wx.png" mode="aspectFill"></image><text>微 信 登 录</text>
		</button>
		<uni-popup ref="popup" type="middle">
			<view class="box">
				<view class="button-header">
					系统将获取电话号码
				</view>
				<view class="button-box">
					<button style="margin-top: 20upx;" type="primary" open-type="getPhoneNumber" @getphonenumber="getphonenumber" withCredentials="true">
						确认
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import { mapMutations } from 'vuex'
export default {
	components: { uniPopup },
	data() {
		return {
			dialog: false,
			loginMsg: {
				code: "",
				appid: "wx7f4e077912aa74ce",
				wxUser: {},
				phoneInfo: {}
			},
			regMsg: {
				code: "",
				appid: "wx7f4e077912aa74ce"
			},
		}
	},
	onUnload() {
		this.SET_LOGIN_STATUS(false)
	},
	beforeDestroy() {
		this.SET_LOGIN_STATUS(false)
	},
	methods: {
		...mapMutations([ "SET_LOGIN_STATUS" ]),
		// 用户登录
		login() {
			return new Promise((resolve, reject) => {
				uni.login({
				  provider: 'weixin',
				  success: res => {
						this.loginMsg.code = res.code
						this.regMsg.code = res.code
						resolve() 
				  },
					fail() { 
						reject("登录失败")
					}
				});
			})
		},
		// 判断是否已经注册
		async checkReg() {
			await this.login()
			return this.$http_json({
				url: "/auth/checkWxReg",
				method: "post",
				data: this.regMsg
			}).then(result => {
				if(!result.data) {
					this.$refs.popup.open()
				}else {    
					delete this.loginMsg.phoneInfo
					this.getAuth() 
				}
			})
		},
		// 获取后台权限
		async getAuth() {
			await this.login()
			this.$http_json({
				url: "/auth/loginWx",
				method: "post",
				data: this.loginMsg
			}).then(result => {
				this.login()
				uni.setStorageSync("userInfo", result.data.user)
				uni.setStorageSync("token", result.data.token)
				this.$navigateBack()
			}).catch(() => {
				this.login()
			})
		},
		async getuserinfo(e) {
			await this.checkReg()
			const infoRes = e.mp.detail
			this.isLogin = true
			this.loginMsg.wxUser = e.mp.detail.userInfo
			this.loginMsg.wxUser.nickname = this.loginMsg.userInfo.nickName
			this.loginMsg.wxUser.gender = `${this.loginMsg.userInfo.gender}`
			delete this.loginMsg.wxUser.nickName
		},
		// 获取电话号码
		getphonenumber(e) {
			const infoRes = e.detail
			this.loginMsg.phoneInfo.encryptedData = infoRes.encryptedData
			this.loginMsg.phoneInfo.iv = infoRes.iv
			this.$refs.popup.close()
			this.getAuth()
		},
	}
}
</script>

<style lang="scss">
.login {
	height: 100%;
}
.background {
	position: absolute;
	width: 100%;
	height: 100%;
}
.box {
	position: relative;
	width: 500upx;
	height: 300upx;
	left: 375upx;
	top: 400upx;
	transform: translateX(-50%);
	text-align: center;
	background-color: #fefefe;
	border-radius: 20upx;
}
.button-header {
	position: relative;
	top: 80upx;
	text-align: center;
	font-size: 40upx;
}
.button-box {
	position: absolute;
	bottom: 0;
	width: 100%;
}
.button-box button {
	border-top-right-radius: 0px;
	border-top-left-radius: 0px;
	background-color: #007AFF!important;
}
.login-button {
	position: absolute;
	bottom: 200upx;
	width: 600upx;
	left: 50%;
	margin-left: -300upx;
	background-color: #fad126!important;
	font-size: 32upx;
	image {
		position: relative;
		top: 10upx;
		right: 10upx;
		width: 50upx;
		height: 40upx;
	}
}
</style>
