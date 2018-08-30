<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'
	import md5 from 'md5'

	export default {
		name: 'upload',
		data: () => ({
			file: null,
			fileName: null,
		}),
		beforeDestory () {
			window.removeEventListener('paste', this.onPaste)
		},
		mounted () {
			window.addEventListener('paste', this.onPaste)
		},
		methods: {
			...mapActions({
				upload: 'upload/uploadImage',
				reset: 'upload/resetImages',
			}),
			selectFile(file) {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = event => {
					this.file = event.target.result
				}
			},
			selectImage(event) {
				this.selectFile(event.target.files[0])
				this.fileName = event.target.value.split( '\\' ).pop()
			},
			onPaste(event) {
				const item = (event.clipboardData  || event.originalEvent.clipboardData).items
				const image = item[0].type.indexOf('image') === 0 ? item[0].getAsFile() : null
				if (image) this.selectFile(image)
			}
		}
	}

</script>

<template>
	<div class='upload'>
		<div class='box'>
			<input type='file' id='input-file' class='input-file' @change='selectImage' />
			<label for='input-file'>
				<span>{{ fileName || 'Choose a file...' }}</span>
			</label>
		</div>
		<button @click='upload(file)'>Upload!</button>
		<button @click='reset()'>Reset</button>
	</div>
</template>