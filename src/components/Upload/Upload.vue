<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'
	import md5 from 'md5'

	export default {
		name: 'upload',
		computed: {
			...mapState({
				'file': state => state.upload.file,
			}),
		},
		methods: {
			...mapActions({
				uploadPhoto: 'upload/uploadPhoto',
				selectPhoto: 'upload/selectPhoto',
				resetPhotos: 'upload/resetPhotos',
			})
		}
	}

</script>

<template>
	<div class='upload'>
		<input type='file' @change='selectPhoto'>
		<button @click='uploadPhoto(file)'>Upload!</button>
		<button @click='resetPhotos()'>Reset</button>
	</div>
</template>