/**
 * @author xuanzai
 * @description 选择文件获取图片url
 * @param {Number} limit 图片大小限制，默认为2MB
 * @returns {Promise}
 */
function getImgFile(limit = 20) {
	// #ifdef H5
	return new Promise((resolve, reject) => {
		let
			reader = new FileReader(),
			pattern = new RegExp(/^image/),
			fileEle = document.createElement('input'),
			event = new MouseEvent('click'),
			data = {}
		fileEle.type = "file"
		fileEle.accept = "image/*"
		fileEle.style.display = 'none'
		fileEle.addEventListener('change', () => {
			const files = fileEle.files[0]
			data.raw = files
			files.size / (1024 ** 2) > limit ?
				reject(`图片大小不能超过${limit}MB!`) :
				(pattern.test(files.type) ?
					reader.readAsDataURL(files) :
					reject('请选择图片!'))
			document.body.removeChild(fileEle)
		})
		reader.addEventListener('load', () => {
			data.url = reader.result
			resolve(data)
		})
		fileEle.dispatchEvent(event)
		document.body.appendChild(fileEle)
	})
	// #endif
	// #ifndef H5
	return new Promise((resolve, reject => {
		uni.chooseImage({
		    count: 6, //默认9
		    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		    success: res => {
		      resolve(res.tempFilePaths)
		    },
				fail: e => {
					reject(e)
				}
		});
	}))
	// #endif
}

/**
 * @description 获取图片的base64
 * @param {DOM Object} image 
 * @returns {String}
 */
// #ifdef H5
function getBase64Image(image) {
	const
		canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		width = image.width,
		height = image.height
	canvas.width = width
	canvas.height = height
	ctx.drawImage(image, 0, 0, width, height)
	return canvas.toDataURL(`image/${image.src.toLowerCase()}`)
}

/**
 * @description 从新的标签页打开base64图片
 * @param {String} base64 
 */
function openPictureBase64(base64) {
	const
		image = new Image(),
		newTag = window.open('', '_blank')
	image.src = base64
	newTag.document.body.style['textAlign'] = "center"
	newTag.document.body.appendChild(image)
}
// #endif

export default {
	getImgFile,
	// #ifdef H5
	getBase64Image,
	openPictureBase64
	// #endif
}
