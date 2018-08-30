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
		mounted () {
			const options = [
				{ el: this.$refs['wall'] },
			]
			this.$smoothReflow(options)

			// this.$anime({
			// 	targets: '.curve-from-1 path[pid="0"]',
			// 	d: 'M46 448.3c192.628-26.747 295.493-169.509 451.65-257.2 93.67-52.604 169.14-137.851 266.506-105.177 68.66 23.04 138.386 119.268 210.096 90.67 65.777-26.234 97.85-128.482 164.1-155.593 226.432-92.663 205.671 152.07 205.864 283.085l.545 372.004L45 676.281 46 448.3z',
			// 	duration: 8000, loop: true, direction: 'alternate', easing: 'linear'
			// });
		},
		updated () {
			console.log(Object.keys(this.$refs['item']))
			// if (Object.keys(this.$refs['item']).length > 0) {
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
		},
		computed: {
			...mapState({
				// 'images': state => state.wall.images.length > 0 ? (true == true ? console.log('1') : console.log('2')) : false,
			}),
		},
	}

</script>

<template>
	<div class='wall' ref='wall'>
		<header>
			Image Wall
		</header>
		<!-- <transition name='fade'>
			<Loader ref='loader' v-show='images == false' :loading='images.length > 0' />
		</transition>
		<transition name='fade'>
			<div v-show='images.length > 0' class='wall-container'>
				<div class='row' v-for='set in images'>
					<div class='item' v-for='image in set' ref='item'>
						<img :src='image' ref='item-image'/>
					</div>
				</div>
			</div>
		</transition> -->
	</div>
</template>