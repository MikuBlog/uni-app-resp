<template>
	<view class="content">
		<view @click="downloadFile">
			点我下载
		</view>
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
