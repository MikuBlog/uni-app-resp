<template>
	<view class="lvv-popup" v-show="popshow">
		<view class="lvv-popupmark" @click="close"></view>
		<view
			class="lvv-popupcontent"
			@click="close"
			:class="
				position == 'top' && !hideanimation
					? '.pt'
					: position == 'left' && !hideanimation
					? '.pl'
					: position == 'right' && !hideanimation
					? '.pr'
					: position == 'bottom' && !hideanimation
					? '.pb'
					: position == 'top' && hideanimation
					? '.ht'
					: position == 'left' && hideanimation
					? '.hl'
					: position == 'right' && hideanimation
					? '.hr'
					: position == 'bottom' && hideanimation
					? '.hb'
					: ''
			"
		>
			<view class="realcontent" @click.stop=""><slot></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		value: {
			default: 'child'
		},
		position: {
			type: String,
			default: 'left'
		}
	},
	data() {
		return {
			popshow: false,
			hideanimation: false
		};
	},
	methods: {
		// Toshow popup page
		show: function() {
			this.popshow = true;
		},
		// Tohide popup page
		close: function() {
			let that = this;
			that.hideanimation = true;
			if (that.position == null) {
				that.popshow = false;
			} else {
				setTimeout(function() {
					that.popshow = false;
					that.hideanimation = false;
					that.$emit('input', that.popshow);
				});
			}
		}
	},
	watch:{
		value(newValue){
			if(newValue){
				this.show()
			}else{
				this.close()
			}
		}
	}
};
</script>

<style lang="scss">
.lvv-popup {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 99;
	.lvv-popupmark {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		position: absolute;
		background: rgba(0, 0, 0, 0.5);
	}
	.lvv-popupcontent {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		z-index: 100;
	}
	.pt {
		animation: showtop 0.5s;
	}
	.pl {
		animation: showleft 0.5s;
	}
	.pr {
		animation: showright 0.5s;
	}
	.pb {
		animation: showbottom 0.5s;
	}
	.ht {
		animation: hidetop 0.55s;
	}
	.hl {
		animation: hideleft 0.55s;
	}
	.hr {
		animation: hideright 0.55s;
	}
	.hb {
		animation: hidebottom 0.55s;
	}
}
@keyframes showtop {
	from {
		transform: translateY(-100%);
	}
	to {
		transform: translateY(0);
	}
}
@keyframes showleft {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateY(0);
	}
}
@keyframes showright {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}
@keyframes showbottom {
	from {
		transform: translateY(100%);
	}
	to {
		transform: translateY(0);
	}
}
@keyframes hidetop {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(-100%);
	}
}
@keyframes hideleft {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateX(-100%);
	}
}
@keyframes hideright {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(100%);
	}
}
@keyframes hidebottom {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(100%);
	}
}
</style>
