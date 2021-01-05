<template>
	<view class="content">
		<view @click="uploadVideo">
			点击下载海报图片
		</view>
		<!-- <image :src="img" mode="widthFix"></image> -->
	</view>
</template>

<script>
import Operation from './js/operation.js'
import Property from './js/property.js'
export default {
	mixins: [ Operation, Property ]
};
</script>

<style lang="scss" scoped src="./scss/index.scss"></style>
