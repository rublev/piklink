<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState } from 'vuex'

	export default {
		name: 'wall',
		mounted () {
			this.$nextTick(() => this.matchHeight())
		},
		updated () {
			console.log('update')
			this.$refs['item'].map(element => {
				console.log(element.clientHeight)
				element.style.height = `${element.clientWidth}px`
				console.log(`${element.clientWidth}px`)
				// element.clientHeight = element.clientWidth
			})
		},
		methods: {
			matchHeight () {
				// console.log(this.$refs['item'].length)
				// console.log(this.$refs.length)
				// console.log(JSON.stringify(this.$refs['item'], null, 2))
				// this.$refs['item'].map(element => {
				// 	console.log(element)
				// 	element.clientHeight = element.clientWidth
				// })
			},
		},
		computed: {
			...mapState({
				'images': state => _.chunk(state.wall.images, 3),
			}),
		},
	}

</script>

<template>
	<div class='wall'>
		<header>
			Image Wall
		</header>
		<div class='row' v-for='set in images'>
			<div class='item' v-for='image in set' ref='item'>
				<img :src='image' />
			</div>
		</div>
		<!-- <div class='item' v-for='image in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]'>
			<img src='https://via.placeholder.com/1000x1000' />
		</div> -->
	</div>
</template>