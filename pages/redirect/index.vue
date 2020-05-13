<template>
</template>

<script>
export default {
	// h5 微信登录重定向
	onLoad() {
		let clock = setInterval(() => {
			if(this.$getMemoryPmt('token')) {
				clearInterval(clock)
				if(this.$getMemoryPmt('url')) {
					this.$reLaunch({
						url: this.$getMemoryPmt('url')
					})
					this.$setMemoryPmt('url', '')
					return
				}
				this.$reLaunch({
					url: "/pages/home/index"
				})
			}
		}, 300)
	}
}
</script>

<style>
</style>
