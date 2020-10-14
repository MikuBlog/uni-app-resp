<template>
	<view class="uni-numbox">
		<view :class="{'uni-numbox--disabled': inputValue <= min || disabled}" class="uni-numbox__minus" @click="_calcValue('minus')">-</view>
		<view style="color: #ff5686" :disabled="disabled" v-model="inputValue" class="uni-numbox__value" type="number" @tap="ifShow(inputValue)" adjust-position="false">{{inputValue}}</view>
		<view :class="{'uni-numbox--disabled': inputValue >= max || disabled}" class="uni-numbox__plus" @click="_calcValue('plus')">+</view>
		<view class="modelBox" v-if="showHide">
			<view class="shade" @tap="modelHide"></view>
			<view class="model">
				<view class="modelTitle">请输入数量</view>
				<view class="modelInput">
					<input style="color: #ff5686" placeholder-class="inputStyle" v-model="modelValue"  type="number" focus/>
				</view>
				<view class="modeBtnBox">
					<view style="color: #878787" class="" @tap="modelHide">取消</view>
					<view class="" @tap="confirm">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'UniNumberBox',
		props: {
			value: {
				type: [Number, String],
				default: 0
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			index:{
				type: [Number, String],
			}
		},
		data() {
			return {
				inputValue: 0,
				windowHeight: '',
				modelValue:0,//model
				showHide:false,//显示隐藏
				isInit: false
			}
		},
		watch: {
			value(val) {
				this.inputValue = +val
			},
			inputValue(newVal, oldVal) {
				if(!this.isInit) {
					this.isInit = true
				} else {
					if (+newVal !== +oldVal) {
						let a=null
						if(this.index!=undefined){
							a=[this.index,newVal]
						}else{
							a=newVal
						}
					}
				}
				this.$emit('change', newVal)
			}
		},
		created() {
			this.inputValue = +this.value
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return
				}
				const scale = this._getDecimalScale()
				let value = this.inputValue * scale
				let step = this.step * scale
				if (type === 'minus') {
					value -= step
				} else if (type === 'plus') {
					value += step
				}
				if (value < this.min || value > this.max) {
					return
				}
				this.inputValue = value / scale
			},
			_getDecimalScale() {
				let scale = 1
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length)
				}
				return scale
			},
			_onBlur(event) {
				let value = event.detail.value
				console.log(value)
				return;
				if (!value) {
					this.inputValue = 0
					return
				}
				value = +value
				if (value > this.max) {
					value = this.max
				} else if (value < this.min) {
					value = this.min
				}
				this.inputValue = value
			},
			// 显示model
			ifShow(e){
				this.modelValue=e
				console.log(this.modelValue)
				this.showHide=true
			},
			//隐藏model
			modelHide(){
				this.showHide=false
			},
			// 确定
			confirm(){
				if(this.modelValue>this.max){
					this.inputValue=this.max
				}else{
					this.inputValue=this.modelValue
				}
				this.showHide=false
			}
		}
	}
</script>
<style>
	.uni-numbox {
		display: inline-flex;
		flex-direction: row;
		justify-content: space-between;
		height: 40upx;
		width: 120upx;
		position: relative
	}

	.uni-numbox:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border: 1px solid #c8c7cc;
		border-radius: 12upx;
		transform: scale(.5);
	}

	.uni-numbox__minus,
	.uni-numbox__plus {
		margin: 0;
		background-color: #f8f8f8;
		width: 70upx;
		font-size: 30upx;
		height: 100%;
		line-height: 80upx;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #333;
		position: relative
	}
/* 	.uni-numbox__plus {
		background-color: #247bff;
		color: #fefefe;
		font-weight: bold;
		border
	} */
	.uni-numbox__value {
		position: relative;
		background-color: #fff;
		width: 108upx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0
	}

	.uni-numbox__value:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-style: solid;
		border-color: #c8c7cc;
		border-left-width: 1px;
		border-right-width: 1px;
		border-top-width: 0;
		border-bottom-width: 0;
		transform: scale(.5)
	}

	.uni-numbox--disabled {
		color: silver
	}
	.modelBox{
	}
	.shade{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		background-color: rgba(0,0,0,.6);
	}
	.model{
		width: 80%;
		border-radius: 10upx;
		background-color: #fff;
		padding: 30upx;
		box-sizing: border-box;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 200;
	}
	.modelTitle{
		font-size: 34upx;
		color: #333;
		margin-bottom: 20upx;
	}
	.modelInput{
		width: 100%;
		height: 40upx;
		font-size: 30upx;
		color: #333;
		margin-bottom: 40upx;
	}
	.modelInput input{
		width: 100%;
		height: 100%;
		border: none;
		border-bottom:2upx solid #ff5686 ;
	}
	.modeBtnBox{
		width: 100%;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: #ff5686;
		font-size: 30upx;
	}
	.modeBtnBox view{
		width: 25%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>