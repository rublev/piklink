<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState } from 'vuex'

	export default {
		name: 'wall',
		computed: {
			...mapState({
				'images': state => state.wall.images,
			}),
		},
	}

</script>

<template>
	<div class='wall'>
		<!-- <div class='item' v-for='image in images'>
			<img :src='image' />
		</div> -->
		<!-- <div class='item' v-for='image in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]'>
			<img src='https://via.placeholder.com/1000x1000' />
		</div> -->
	</div>
</template>