<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'
	import moment from 'moment'

	export default {
		name: 'image-display',
		data: () => ({
			moment
		}),
		computed: {
			...mapState({
				'modalImage': state => state.wall.modalImage,
				'id': state => state.wall.modalImage.id,
				'date': state => state.wall.modalImage.date,
				'avatar': state => state.wall.modalImage.avatar,
				'created': state => moment(state.wall.modalImage.created).format('dddd, MMMM Do, YYYY'),
				'images': state => state.wall.images,
			}),
		},
		methods: {
			...mapActions({
				fetchImage: 'wall/fetchImage', // remove ??
			}),
		},
		// watch: {
		// 	modalImage
		// },
		mounted() {
			console.log(moment('2010-10-20 4:30 +0000').format('dddd, MMMM Do, YYYY'))
		}
	}

</script>

<template>
	<div class='image-display'>
		<img :src='modalImage.data' class='modal-image'/>
		<div class='details'>
			{{ created }}
		</div>
	</div>
</template>