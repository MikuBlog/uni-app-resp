<template>
	<view class="login">
		<view class="header">欢迎使用</view>
		<view class="input-box">
			<view class="input input-flex"><input type="text" placeholder="请输入账号" v-model="username" /></view>
			<view class="input input-normal"><input type="password" placeholder="请输入密码" v-model="password" /></view>
		</view>
		<view class="button-box">
			<view class="login-button" @click="login">登录</view>
		</view>
	</view>
</template>

<script>
import { encrypt } from '@/utils/encrypt'
export default {
	data() {
		return {
			username: '',
			password: ''
		};
	},
	onUnload() {
		this.SET_LOGIN_STATUS(false)
	},
	methods: {
		// 账号登录
		login() {
			this.$http_json({
				url: "/auth/login",
				method: "post",
				data: {
					username: this.username,
					password: encrypt(this.password)
				}
			}).then(result => {
				this.$setMemoryPmt("token", result.data.token)
				this.$setMemoryPmt("userInfo", result.data.user)
				this.$showToast({
					title: "登录成功"
				})
				setTimeout(() => {
					this.$navigateBack()
				}, 1000)
			})
		}
	}
};
</script>

<style>
page {
	background: #fefefe;
}
.login {
	padding: 0 60upx;
}
.header {
	margin-top: 80upx;
	font-size: 50upx;
	color: #030f74;
}
.input-box {
	margin-top: 40upx;
}
.input-box input {
	font-size: 28upx;
}
.input-flex {
	padding: 20upx 0;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e9e9e9;
}
.input-flex input {
	flex: 1;
}
.input-normal {
	border-bottom: 1px solid #e9e9e9;
	padding: 20upx 0;
}
.input {
	margin-top: 20upx;
}
.code {
	width: 250upx;
	text-align: center;
	border-left: 1px solid #e9e9e9;
}
.button-box {
	margin-top: 80upx;
}
.login-button {
	line-height: 80upx;
	background-color: #2a82e4;
	color: #fefefe;
	border-radius: 10upx;
	text-align: center;
}
.wx-button {
	margin-top: 30upx;
	line-height: 80upx;
	background-color: #49c265;
	color: #fefefe;
	border-radius: 10upx;
	text-align: center;
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
.box .button-header {
	position: relative;
	top: 80upx;
	text-align: center;
	font-size: 40upx;
}
.box .button-box {
	position: absolute;
	bottom: 0;
	width: 100%;
}
.box .button-box button {
	border-top-right-radius: 0px;
	border-top-left-radius: 0px;
	background-color: #007AFF!important;
}
</style>
