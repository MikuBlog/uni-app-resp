<template>
	<canvas v-if="use2dCanvas" :id="canvasId" type="2d" :style="style"></canvas>
	<canvas v-else :canvas-id="canvasId" :style="style" :id="canvasId" :width="boardWidth * dpr" :height="boardHeight * dpr"></canvas>
</template>

<script>
import { toPx, base64ToPath, compareVersion} from './utils';
import { Draw } from './draw';
import { adaptor } from './canvas';
export default {
	// version: '1.5.9.2',
	name: 'l-painter',
	props: {
		board: Object,
		fileType: {
			type: String,
			default: 'png'
		},
		width: [Number, String],
		height: [Number, String],
		pixelRatio: Number,
		customStyle: String,
		isRenderImage: Boolean,
		isBase64ToPath: Boolean,
		isH5PathToBase64: Boolean,
		sleep: {
			type: Number,
			default: 1000/30
		},
		type: {
			type: String,
			default: '2d',
		}
	},
	data() {
		return {
			// #ifndef MP-WEIXIN || MP-QQ 
			canvasId: `l-painter_${this._uid}`,
			// #endif
			// #ifdef MP-WEIXIN || MP-QQ 
			canvasId: `l-painter`,
			// #endif
			// #ifdef MP-WEIXIN
			use2dCanvas: true,
			// #endif
			// #ifndef MP-WEIXIN
			use2dCanvas: false,
			// #endif
			draw: null,
			ctx: null
		};
	},
	computed: {
		newboard() {
			return this.board && JSON.parse(JSON.stringify(this.board))
		},
		style() {
			return `width:${this.boardWidth}px; height: ${this.boardHeight}px; ${this.customStyle}`;
		},
		dpr() {
			return this.pixelRatio || uni.getSystemInfoSync().pixelRatio;
		},
		boardWidth() {
			const { width = 200 } = this.board || {};
			return toPx(this.width || width);
		},
		boardHeight() {
			const { height = 200 } = this.board || {};
			return toPx(this.height || height);
		}
	},
	mounted() {
		// #ifdef MP-WEIXIN
		const {SDKVersion} = wx.getSystemInfoSync()
		this.use2dCanvas = this.type === '2d' && compareVersion(SDKVersion, '2.9.2') >= 0;
		// #endif
		this.$watch('newboard', async (val, old) => {
			if (JSON.stringify(val) === '{}' || !val) return;
			const {width: w, height: h} = val || {};
			const {width: ow, height: oh} = old || {};
			if(w !== ow || h !== oh) {
				this.inited = false;
			}
			this.render();
		}, {
			deep: true, 
			immediate: true,
			})
	},
	methods: {
		async render(args = {}, single = false) {
			const ctx = await this.getContext()
			const { use2dCanvas, boardWidth, boardHeight, board, canvas, isBase64ToPath, isH5PathToBase64, sleep } = this;
			if (use2dCanvas && !canvas) {
				return Promise.reject(new Error('render: fail canvas has not been created'));
			}
			if(!this.boundary) {
				this.boundary = {
				  top: 0,
				  left: 0,
				  width: boardWidth,
				  height: boardHeight,
				  sleep
				}
			}
			if(!single) {
				ctx.clearRect(0, 0, boardWidth, boardHeight);
			}
			if(!this.draw) {
				this.draw = new Draw(ctx, canvas, use2dCanvas, isH5PathToBase64, this.boundary);
			} 
			if(JSON.stringify(args) != '{}' || board && JSON.stringify(board) != '{}') {
				await this.draw.drawBoard(JSON.stringify(args) != '{}' ? args : board);
			}
			await new Promise(resolve => this.$nextTick(resolve)) 
			if (!use2dCanvas && !single) {
				await this.canvasDraw(ctx);
			}
			this.$emit('done')
			if(this.isRenderImage && !single) {
				this.canvasToTempFilePath()
				.then(async res => {
					if(/^data:image\/(\w+);base64/.test(res.tempFilePath) && isBase64ToPath) {
						const img = await base64ToPath(res.tempFilePath)
						this.$emit('success', img)
					} else {
						this.$emit('success', res.tempFilePath)
					}
				})
				.catch(err => {
					this.$emit('fail', err)
					new Error(JSON.stringify(err))
					console.error(JSON.stringify(err))
				})
			}
			return Promise.resolve({ctx, draw: this.draw});
		},
		async custom(cb) {
			const {ctx, draw} = await this.render({}, true)
			ctx.save()
			await cb(ctx, draw)
			ctx.restore()
			return Promise.resolve(true);
		},
		async single(args = {}) {
			await this.render(args, true)
			return Promise.resolve(true);
		},
		canvasDraw(flag = false) {
			const {ctx} = this
			return new Promise(resolve => {
				ctx.draw(flag, () => {
					resolve(true);
				});
			});
		},
		saveImage() {
			this.$showLoading({
				title: "正在保存"
			})
			this.canvasToTempFilePath().then(res => {
				uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: res => {
						this.$showToast({
							icon: "none",
							title: "保存成功，分享给你的朋友吧！"
						})
					},
					fail: e => {
						this.$showModal({
							title: "提示",
							content: "需要您授权保存相册",
							success: e => {
								if(e.confirm) {
									uni.openSetting({
										success: e => {
											console.log(e)
										},
										fail: e => {
											console.log(e)
										}
									})
								}
							}
						})
					},
					complete: () => {
						this.$hideLoading()
					}
				});
			})
		},
		async getContext() {
			if(this.ctx && this.inited) {
				return Promise.resolve(this.ctx)
			};
			const { type, use2dCanvas, dpr, boardWidth, boardHeight } = this;
			const _getContext = () => {
				return new Promise(resolve => {
				uni.createSelectorQuery()
					.in(this)
					.select('#' + this.canvasId)
					.boundingClientRect()
					.exec(res => {
						if(res) {
							const ctx = uni.createCanvasContext(this.canvasId, this);
							if (!this.inited) {
								this.inited = true;
								this.use2dCanvas = false;
								this.canvas = res
							}
							// #ifdef MP-ALIPAY
							ctx.scale(dpr, dpr);
							// #endif
							this.ctx = ctx
							resolve(ctx);
						}
					})
				})
			}
			// #ifndef MP-WEIXIN 
			return _getContext()
			// #endif
			
			if(!use2dCanvas) {
				return _getContext()
			}
			return new Promise(resolve => {
				uni.createSelectorQuery()
					.in(this)
					.select('#l-painter')
					.node()
					.exec(res => {
						const canvas = res[0].node;
						if(!canvas) {
							this.use2dCanvas = false;
							return this.getContext()
						}
						const ctx = canvas.getContext(type);
						if (!this.inited) {
							this.inited = true;
							canvas.width = boardWidth * dpr;
							canvas.height = boardHeight * dpr;
							this.use2dCanvas = true;
							this.canvas = canvas
							ctx.scale(dpr, dpr);
						}
						this.ctx = adaptor(ctx)
						resolve(adaptor(ctx));
					});
				
			});
		},
		canvasToTempFilePath(args = {}) {
		  const {use2dCanvas, canvasId} = this
		  return new Promise((resolve, reject) => {
		    let { top = 0, left = 0, width, height } = this.boundary || this
			let destWidth = width * this.dpr
			let destHeight = height * this.dpr
			// #ifdef MP-ALIPAY
			width = width * this.dpr
			height = height * this.dpr
			// #endif
		    const copyArgs = {
		      x: left,
		      y: top,
		      width,
		      height,
		      destWidth,
		      destHeight,
		      canvasId,
		      fileType: args.fileType || this.fileType,
		      quality: args.quality || 1,
		      success: resolve,
		      fail: reject
		    }
		    if (use2dCanvas) {
		      delete copyArgs.canvasId
		      copyArgs.canvas = this.canvas
		    }
		    uni.canvasToTempFilePath(copyArgs, this)
		  })
		}
	}
};
</script>

<style></style>
