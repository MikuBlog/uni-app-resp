/**
 * @author xuanzai
 * @description 选择文件获取图片url
 * @param {Number} limit 图片总大小限制，默认为10MB
 * @param {Number} count 图片总数，默认为三张
 * @returns {Promise}
 */
function getImgFile(limit = 10, count = 3) {
	// #ifdef H5
	return new Promise((resolve, reject) => {
		let
			fileEle = document.createElement('input'),
			event = new MouseEvent('click')
		fileEle.type = "file"
		fileEle.accept = "image/*"
		count > 1 && (fileEle.multiple = 'multiple')
		fileEle.style.display = 'none'
		fileEle.addEventListener('change', () => {
			const fileList = fileEle.files
			let size = 0,
				urlList = []
			urlList.forEach.call(fileList, val => {
				size += val.size
				urlList.push(new Promise((resolve, reject) => {
					let reader = new FileReader()
					reader.readAsDataURL(val)
					reader.addEventListener('load', () => {
						resolve({
							url: reader.result,
							raw: val
						})
					})
				}))
			})
			if (urlList.length > count) {
				reject(`选择图片数量不能超过${count}张!`)
				return
			}
			if (size / (1024 ** 2) > limit) {
				reject(`图片总大小不能超过${limit}MB!`)
				return
			}
			Promise.all(urlList).then(result => {
				resolve(result)
			})
			document.body.removeChild(fileEle)
		})
		fileEle.dispatchEvent(event)
		document.body.appendChild(fileEle)
	})
	// #endif
	// #ifndef H5
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			success: res => {
				resolve(res.tempFilePaths)
			},
			fail: e => {
				reject(e)
			}
		});
	})
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

/**
 * @description base64转blob
 * @param {String} base64 
 */
// #ifdef H5
function dataUrlToBlob(dataurl) {
	var arr = dataurl.split(',');
	//注意base64的最后面中括号和引号是不转译的   
	var _arr = arr[1].substring(0, arr[1].length - 2);
	var mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(_arr),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}
// #endif

/**
 * @description base64转blob
 * @param {String} base64 
 */
// #ifdef H5
function downloadBase64Image(base64) {
	const a = document.createElement('a')
	const event = document.createEvent('HTMLEvents')
	event.initEvent("click", true, true);
	a.download = 'image'
	a.href = window.URL.createObjectURL(dataUrlToBlob(base64))
	document.body.appendChild(a)
	a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
	a.remove()
}
// #endif

export default {
	getImgFile,
	// #ifdef H5
	getBase64Image,
	openPictureBase64,
	dataUrlToBlob,
	downloadBase64Image
	// #endif
}
