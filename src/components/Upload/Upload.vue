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
		methods: {
			...mapActions({
				upload: 'upload/uploadPhoto',
				reset: 'upload/resetPhotos',
			}),
			selectPhoto (event) {
				const { target } = event
				this.file = target.files[0]
				this.fileName = target.value.split( '\\' ).pop()
			}
		}
	}
</script>

<template>
	<div class='upload'>
		<input type='file' id='input-file' class='input-file' @change='selectPhoto' />
		<label for='input-file' class='button blue'>
			<span>{{ fileName || 'Choose a file...' }}</span>
		</label>
		<button @click='upload(file)'>Upload!</button>
		<button @click='reset()'>Reset</button>
	</div>
</template>