<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'

	export default {
		name: 'image-display',
		computed: {
			...mapState({
				'modalImage': state => state.wall.modalImage,
				'images': state => state.wall.images,
			}),
		},
		methods: {
			...mapActions({
				fetchImage: 'wall/fetchImage',
			}),
		},
	}

</script>

<template>
	<div class='image-display'>
		<img :src='modalImage' />
	</div>
</template>