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
	padding: 0 60rpx;
}
.header {
	margin-top: 80rpx;
	font-size: 50rpx;
	color: #030f74;
}
.input-box {
	margin-top: 40rpx;
}
.input-box input {
	font-size: 28rpx;
}
.input-flex {
	padding: 20rpx 0;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e9e9e9;
}
.input-flex input {
	flex: 1;
}
.input-normal {
	border-bottom: 1px solid #e9e9e9;
	padding: 20rpx 0;
}
.input {
	margin-top: 20rpx;
}
.code {
	width: 250rpx;
	text-align: center;
	border-left: 1px solid #e9e9e9;
}
.button-box {
	margin-top: 80rpx;
}
.login-button {
	line-height: 80rpx;
	background-color: #2a82e4;
	color: #fefefe;
	border-radius: 10rpx;
	text-align: center;
}
.wx-button {
	margin-top: 30rpx;
	line-height: 80rpx;
	background-color: #49c265;
	color: #fefefe;
	border-radius: 10rpx;
	text-align: center;
}
.box {
	position: relative;
	width: 500rpx;
	height: 300rpx;
	left: 375rpx;
	top: 400rpx;
	transform: translateX(-50%);
	text-align: center;
	background-color: #fefefe;
	border-radius: 20rpx;
}
.box .button-header {
	position: relative;
	top: 80rpx;
	text-align: center;
	font-size: 40rpx;
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
