<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'
	import md5 from 'md5'

	export default {
		name: 'upload',
		data: () => ({
			file: null,
			fileName: null,
			newFile: null,
		}),
		beforeDestory () {
			window.removeEventListener('paste', this.onPaste)
			window.removeEventListener('dragenter')
			window.removeEventListener('drop')
			window.removeEventListener('dragover')
		},
		mounted () {
			const refs = this.$refs
			window.addEventListener('paste', this.onPaste)
			document.addEventListener('dragenter', function( event ) {
				refs['file-label'].classList.add('drag')
			}, false)
			document.addEventListener('drop', function( event ) {
				event.preventDefault();
				refs['file-label'].classList.add('drag')
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
			setFile(file) {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = event => {
					this.file = event.target.result
				}
			},
			selectImage(event) {
				this.newFile = true
				this.setFile(event.target.files[0])
				this.fileName = event.target.value.split( '\\' ).pop()
				this.$refs['file-label'].classList.add('drag')
			},
			onPaste(event) {
				const item = (event.clipboardData  || event.originalEvent.clipboardData).items
				const image = item[0].type.indexOf('image') === 0 ? item[0].getAsFile() : null
				if (image) this.setFile(image)
				this.$refs['file-label'].classList.add('drag')
				this.newFile = true
			},
			allowDrop(evevent) {
				event.preventDefault()
			},
			drop(evevent) {
				event.preventDefault()
				var data = event.dataTransfer.getData('text')
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
	<div class='upload'>
		<div class='content-box'>
			<transition name='fade'>
				<img v-show='newFile && file' :src='file' />
			</transition>
			<input type='file' id='input-file' class='input-file' @change='selectImage' />
			<label for='input-file' ref='file-label'>
				<span :class="{ 'has-file': newFile }" v-html="fileName || `<span class='strong'>Select</span> a file, <span class='strong'>drag & drop,</span> or <span class='strong'>paste</span> from your clipboard...`"></span>
			</label>
		</div>
		<div class='upload-boxes'>
			<button :disabled='!newFile' @click='uploadImage(file)'>Upload!</button>
			<button @click='resetAll()' class='blank color-light-gray'>Cancel</button>
		</div>
	</div>
</template>