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
		<div class='item' v-for='image in images'>
			<img :src='image' />
		</div>
	</div>
</template>