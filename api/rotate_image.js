export default function (img, cb) {
	new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: img,
			success: res => {
				if (res.orientation == 'up') {
					cb(res.path);
					return;
				}
				let canvasContext = uni.createCanvasContext('canvas');
				const tempFilePaths = res.path;
				switch (res.orientation) {
					case 'down':
						var width = res.width;
						var height = res.height;
						this.imageWidth = width;
						this.imageHeight = height;
						//需要旋转180度
						canvasContext.translate(width / 2, height / 2);
						canvasContext.rotate((180 * Math.PI) / 180);
						canvasContext.drawImage(tempFilePaths, -width / 2, -height / 2, width, height);
						break;
					case 'left':
						var width = res.width;
						var height = res.height;
						this.imageWidth = height;
						this.imageHeight = width;
						canvasContext.translate(height / 2, width / 2);
						//顺时针旋转270度
						canvasContext.rotate((270 * Math.PI) / 180);
						canvasContext.drawImage(tempFilePaths, -width / 2, -height / 2, width, height);
						break;
					case 'right':
						var width = res.width;
						var height = res.height;
						this.imageWidth = height;
						this.imageHeight = width;
						canvasContext.translate(height / 2, width / 2);
						//顺时针旋转90度
						canvasContext.rotate((90 * Math.PI) / 180);
						canvasContext.drawImage(tempFilePaths, -width / 2, -height / 2, width, height);
						break;
				}
				canvasContext.draw();
				resolve();
			},
			fail: e => {
				reject(e)
			}
		});
	})
		.then(() => {
			setTimeout(() => {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					canvasId: 'canvas',
					success: res => {
						cb(res.tempFilePath);
					},
					fail: function(res) {
						console.log(res);
					}
				});
			}, 1000);
		})
		.catch(e => {
			this.$showToast({
				icon: 'none',
				title: '生成失败'
			});
		});
}