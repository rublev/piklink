<style lang='scss' scoped src='./style.scss' />

<script>

	import md5 from 'md5'

	export default {
		name: 'upload',
		data: () => ({
			blockstack: window.blockstack,
			file: null
		}),
		methods: {
			onFileChanged (event) {
				this.file = event.target.files[0]
			},
			upload () {
				this.readFile(this.file)
			},
			readFile (file) {
				const filereader = new FileReader()
				filereader.onload = event => {
					const result = event.target.result
					const path = 'images/' + md5(result)
					this.uploadImageAndUpdateIndex(path, result)
				}
				console.log('file', file)
				filereader.readAsDataURL(file)
			},
			uploadImageAndUpdateIndex(path, result) {
				blockstack.putFile(path, result)
					.then(fileUrl => {
						console.log(fileUrl);
					})
					.catch((e) => {
						console.error(e)
					})
			}
		}
	}

</script>

<template>
	<div class='upload'>
		<input type='file' @change='onFileChanged'>
		<button @click='upload'>Upload!</button>
	</div>
</template>