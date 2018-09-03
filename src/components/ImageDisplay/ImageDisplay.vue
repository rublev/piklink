<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState } from 'vuex'
	import moment from 'moment'

	export default {
		name: 'image-display',
		data: () => ({
			moment
		}),
		computed: {
			...mapState({
				'data': state => state.wall.modalImage.data,
				'created': state => moment(state.wall.modalImage.created).format('dddd, MMMM Do, YYYY'),
			}),
		},
	}

</script>

<template>
	<div class='image-display'>
		<img :src='data' class='modal-image'/>
		<div class='details'>
			{{ created }}
		</div>
	</div>
</template>