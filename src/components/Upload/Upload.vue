<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'
	import md5 from 'md5'
	// import smoothReflow from 'vue-smooth-reflow'

	export default {
		name: 'upload',
		// mixins: [ smoothReflow ],
		data: () => ({
			file: null,
			fileName: null,
			newFile: null,
			imagesLoaded: null
		}),
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
		computed: {
			...mapState({
				images: state => state.wall.images.length
			})
		},
		watch: {
			images (newCount, oldCount) {
				this.imagesLoaded = true
				if (newCount > oldCount) {
					this.file = null
				}
			}
		},
		methods: {
			...mapActions({
				upload: 'upload/uploadImage',
				reset: 'upload/resetImages',
			}),
			setFile(file, name = null) {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = event => {
					this.file = event.target.result
					this.newFile = true
					this.fileName = name
				}
			},
			selectImage(event) {
				this.newFile = true
				this.setFile(event.target.files[0], event.target.value.split( '\\' ).pop())
				this.$refs['file-label'].classList.add('drag')
			},
			onPaste(event) {
				const item = (event.clipboardData  || event.originalEvent.clipboardData).items
				const image = item[0].type.indexOf('image') === 0 ? item[0].getAsFile() : null
				if (image) this.setFile(image, 'Pasted image')
				this.$refs['file-label'].classList.add('drag')
				this.newFile = true
			},
			allowDrop(evevent) {
				event.preventDefault()
			},
			drop(evevent) {
				event.preventDefault()
				var data = event.dataTransfer.items.getData('text')
				event.target.appendChild(document.getElementById(data))
			},
			resetAll() {
				this.fileName = null
				this.newFile = false
				this.$refs['file-label'].classList.remove('drag')
			},
			uploadImage(file) {
				this.resetAll()
				this.upload(file)
			}
		}
	}

</script>

<template>
	<div :class="{ upload: true, 'images-loaded': imagesLoaded }" ref='upload'>
		<div class='content-box'>
			<transition name='fade'>
				<img v-show='newFile && file' :src='file' />
			</transition>
			<input type='file' id='input-file' class='input-file' @change='selectImage' />
			<label for='input-file' class='test' ref='file-label'>
				<span :class="{ 'has-file': newFile }" v-html="fileName || `<span class='strong'>Select</span>, <span class='strong'>drop,</span> or <span class='strong'>paste</span> an image from your clipboard...`"></span>
			</label>
		</div>
		<div class='upload-boxes'>
			<button :disabled='!newFile' @click='uploadImage(file)'>Upload!</button>
			<button @click='resetAll()' class='blank color-light-gray'>Cancel</button>
			<button @click='reset()' class='blank color-light-gray'>reset</button>
		</div>
	</div>
</template>