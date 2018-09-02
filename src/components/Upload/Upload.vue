<style lang='scss' scoped src='./style.scss' />

<script>

	import Notification from '@/components/Navigation/Navigation'

	import { mapState, mapActions } from 'vuex'
	import md5 from 'md5'
	import smoothReflow from 'vue-smooth-reflow'

	export default {
		name: 'upload',
		mixins: [ smoothReflow ],
		components: {
			Notification
		},
		computed: {
			...mapState({
				// images: state => state.wall.images.length,
				// loading: state => state.user.loading
				image: state => state.upload.image,
				imageName: state => state.upload.imageName
			})
		},
		beforeDestory () {
			window.removeEventListener('paste', this.onPaste)
			// window.removeEventListener('dragenter')
			// window.removeEventListener('drop')
			// window.removeEventListener('dragover')
		},
		mounted () {
			// const refs = this.$refs
			// const that = this
			window.addEventListener('paste', this.onPaste)
			const options = [
				{ el: this.$refs['content-box'] },
			]
			this.$smoothReflow(options)
			document.addEventListener('dragenter', function( event ) {
				// add class to upload to highlight drag
				// refs['file-label'].classList.add('drag')
			}, false)
			// document.addEventListener('drop', function( event ) {
			// 	event.preventDefault();
			// 	refs['file-label'].classList.add('drag')
			// 	that.setFile(event.dataTransfer.items[0].getAsFile(), event.dataTransfer.items[0].getAsFile().name)
			// }, false)
			// document.addEventListener('dragover', function( event ) {
			// 	event.preventDefault();
			// 	if (event.target.parentNode.toString() == '[object HTMLDocument]') {
			// 		refs['file-label'].classList.remove('drag')
			// 	}
			// }, false)
		},
		methods: {
			...mapActions({
				uploadImage: 'upload/uploadImage',
				resetAccountImages: 'upload/resetAccountImages',
				setImage: 'upload/setImage',
				cancelImage: 'upload/cancelImage',
				onPaste: 'upload/onPaste',
			}),
			// setFile(file, name = null) {
			// 	this.resetAccountImages()
			// 	const reader = new FileReader()
			// 	reader.onload = event => {
			// 		this.file = event.target.result
			// 		this.imageName = name
			// 		console.log(this.$refs['image'].clientHeight)
			// 	}
			// 	reader.readAsDataURL(file)
			// 	console.log(this.$refs['image'].clientHeight)
			// },
			// selectImage(event) {
			// 	this.setFile(event.target.files[0], event.target.value.split( '\\' ).pop())
			// 	this.$refs['file-label'].classList.add('drag')
			// },
			// onPaste(event) {
			// 	const item = (event.clipboardData  || event.originalEvent.clipboardData).items
			// 	const image = item[0].type.indexOf('image') === 0 ? item[0].getAsFile() : null
			// 	if (image) this.setImage({ image, name: 'pasted image', type: 'paste' })
			// },
			// resetAccountImages() {
			// 	this.imageName = null
			// 	this.file = null
			// 	this.$refs['file-label'].classList.remove('drag')
			// },
			// resetImage() {
			// 	this.resetAccountImages()
			// 	this.reset()
			// },
			// uploadImage(file) {
			// 	this.upload(file)
			// 	this.resetAccountImages()
			// }
		}
		/*
		data: () => ({
			file: null,
			imageName: null,
		}),
		computed: {
			...mapState({
				images: state => state.wall.images.length,
				loading: state => state.user.loading
			})
		},
		watch: {
			images (newCount, oldCount) {
				if (newCount !== oldCount) {
					this.file = null
				}
			},
			file () {
				console.log(this.$refs['image'].clientHeight)
			},
		},
		beforeDestory () {
			window.removeEventListener('paste', this.onPaste)
			window.removeEventListener('dragenter')
			window.removeEventListener('drop')
			window.removeEventListener('dragover')
		},
		mounted () {
			const refs = this.$refs
			const that = this
			window.addEventListener('paste', this.onPaste)
			document.addEventListener('dragenter', function( event ) {
				refs['file-label'].classList.add('drag')
			}, false)
			document.addEventListener('drop', function( event ) {
				event.preventDefault();
				refs['file-label'].classList.add('drag')
				that.setFile(event.dataTransfer.items[0].getAsFile(), event.dataTransfer.items[0].getAsFile().name)
			}, false)
			document.addEventListener('dragover', function( event ) {
				event.preventDefault();
				if (event.target.parentNode.toString() == '[object HTMLDocument]') {
					refs['file-label'].classList.remove('drag')
				}
			}, false)
		},
		methods: {
			...mapActions({
				upload: 'upload/uploadImage',
				reset: 'upload/resetImages',
			}),
			setFile(file, name = null) {
				this.resetAccountImages()
				const reader = new FileReader()
				reader.onload = event => {
					this.file = event.target.result
					this.imageName = name
					console.log(this.$refs['image'].clientHeight)
				}
				reader.readAsDataURL(file)
				console.log(this.$refs['image'].clientHeight)
			},
			selectImage(event) {
				this.setFile(event.target.files[0], event.target.value.split( '\\' ).pop())
				this.$refs['file-label'].classList.add('drag')
			},
			onPaste(event) {
				const item = (event.clipboardData  || event.originalEvent.clipboardData).items
				const image = item[0].type.indexOf('image') === 0 ? item[0].getAsFile() : null
				if (image) this.setFile(image, 'Pasted image')
				this.$refs['file-label'].classList.add('drag')
			},
			resetAccountImages() {
				this.imageName = null
				this.file = null
				this.$refs['file-label'].classList.remove('drag')
			},
			resetImage() {
				this.resetAccountImages()
				this.reset()
			},
			uploadImage(file) {
				this.upload(file)
				this.resetAccountImages()
			}
		}
		*/
	}

</script>

<template>
	<div :class='{ upload: true }' ref='upload'>
		<transition name='fade'>
			<img v-show='image' :src='image' ref='image' class='image-file'/>
		</transition>
		<div class='content-box' ref='content-box' :class='{ image, show: !image }'>
			<!-- <input type='file' id='input-file' class='input-file' @change='setImage'/>
			<label for='input-file'>
				<span v-html="imageName ? `<span class='strong'>${imageName ? imageName : 'None'}</span>.` : `<span class='strong'>Click</span>, <span class='strong'>drag & drop,</span> or <span class='strong'>paste</span> an image from your clipboard.`"></span>
			</label> -->
			<div v-if='!image' class='slogan'>
				<span class='strong'>Click</span>,
				<span class='strong'>drag & drop,</span> or
				<span class='strong'>paste</span> an image from your clipboard anywhere in this header.
			</div>
		</div>
		<div class='upload-boxes'>
			<div class='upload-container'>
				<input type='file' id='input-file' class='input-file' @change='setImage'/>
				<label v-if='!image' class='button purple' for='input-file'>
					<span>Select file!</span>
				</label>
				<button v-if='image' class='green icon upload-btn' @click='uploadImage(image)'>
					<svgicon name='icon/signin' class='icon' :original='false'></svgicon>
					<span>
						Upload <span class='strong'>{{ imageName }}</span>
					</span>
				</button>
			</div>
			<div class='cancel-container'>
				<button @click='cancelImage()' class='blank purple'>Cancel</button>
				<button class='blank' disabled>or</button>
				<button @click='resetAccountImages' class='blank purple'>Reset All Images</button>
			</div>
		</div>
	</div>
	<!-- <div :class="{ upload: true, 'images-loaded': images > 0 || file }" ref='upload'>
		<div class='content-box'>
			<transition name='fade'>
				<div v-show='file'>
					<img :src='file' ref='image'/>
				</div>
			</transition>
			<input type='file' id='input-file' class='input-file' @change='selectImage' />
			<label for='input-file' class='test' ref='file-label'>
				<span :class="{ 'has-file': file }" v-html="imageName ? `<span class='strong'>${imageName ? imageName : 'None'}</span> selected.` : `<span class='strong'>Click</span>, <span class='strong'>drag & drop,</span> or <span class='strong'>paste</span> an image from your clipboard anywhere in this header.`"></span>
			</label>
		</div>
		<div class='upload-boxes'>
			<button class='purple icon upload-btn' :disabled='!file' @click='uploadImage(file)'>
				<svgicon name='icon/signin' class='icon' :original='false'></svgicon>
				<span>Upload!</span>
			</button>
			<button @click='resetAccountImages()' class='blank purple'>Cancel</button>
			<button @click='resetImage()' class='blank purple'>Reset All Images</button>
		</div>
	</div> -->
</template>