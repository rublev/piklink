<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState } from 'vuex'
	import smoothReflow from 'vue-smooth-reflow'

	import Loader from '@/components/Loader/Loader'

	export default {
		name: 'wall',
		mixins: [ smoothReflow ],
		components: {
			Loader,
		},
		beforeDestory () {
			window.removeEventListener('resize', this.resize)
		},
		mounted () {
			const options = [
				{ el: this.$refs['wall'] },
			]
			this.$smoothReflow(options)
			this.matchHeights()
			window.addEventListener('resize', this.resize)
			// this.$anime({
			// 	targets: '.curve-from-1 path[pid="0"]',
			// 	d: 'M46 448.3c192.628-26.747 295.493-169.509 451.65-257.2 93.67-52.604 169.14-137.851 266.506-105.177 68.66 23.04 138.386 119.268 210.096 90.67 65.777-26.234 97.85-128.482 164.1-155.593 226.432-92.663 205.671 152.07 205.864 283.085l.545 372.004L45 676.281 46 448.3z',
			// 	duration: 8000, loop: true, direction: 'alternate', easing: 'linear'
			// });
		},
		updated () {
			this.matchHeights()
		},
		computed: {
			...mapState({
				'imagesLength': state => state.wall.index.images.length > 0 ? state.wall.index.images.length: 0,
				'images': state => state.wall.images.length > 0 ? _.chunk(state.wall.images, 4) : [],
				'loading': state => state.user.loading,
			}),
		},
		methods: {
			resize() {
				this.$refs['item'].map(item => {
					item.style.height = `${item.clientWidth}px`
				})
			},
			matchHeights() {
				console.log('match heights')
				if (this.$refs['item'] != null) {
					// if (Object.keys(this.$refs['item']).length >= 3) {
						this.$refs['item'].map(item => {
							item.style.height = `${item.clientWidth}px`
						})
						this.$refs['item-image'].map(itemImage => {
							itemImage.style.height = `${itemImage.clientWidth}px`
							if (itemImage.clientHeight > itemImage.clientWidth) {
								itemImage.style.width = '100%'
								itemImage.style.height = 'auto'
							} else {
								itemImage.style.width = 'auto'
								itemImage.style.height = '100%'
							}
						})
					// } else {
					// 	this.$refs['item'].map(item => {
					// 		item.style.height = `${item.clientWidth}px`
					// 	})
					// 	this.$refs['item-image'].map(itemImage => {
					// 		itemImage.style.height = `${itemImage.clientWidth}px`
					// 		if (itemImage.clientHeight > itemImage.clientWidth) {
					// 			itemImage.style.width = '100%'
					// 			itemImage.style.height = 'auto'
					// 		} else {
					// 			itemImage.style.width = 'auto'
					// 			itemImage.style.height = '100%'
					// 		}
					// 	})
					// }
				}
			},
		},
	}

</script>

<template>
	<div class='wall' ref='wall'>
		<header v-if='imagesLength > 1'>
			{{ `${imagesLength} images` }}
		</header>
		<header v-else-if='imagesLength === 1'>
			{{ `${imagesLength} image` }}
		</header>
		<header v-else>
			Upload some images!
		</header>
		<transition name='fade1'>
			<Loader ref='loader' v-show='loading' />
		</transition>
		<transition name='fade'>
			<div v-show='images != null' class='wall-container'>
				<div class='row' v-for='set in images'>
					<div class='item' v-for='image in set' ref='item'>
						<img :src='image' ref='item-image'/>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>