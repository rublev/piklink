<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'
	import smoothReflow from 'vue-smooth-reflow'

	export default {
		name: 'public-wall',
		mixins: [ smoothReflow ],
		beforeDestory () {
			window.removeEventListener('resize', this.resize)
		},
		mounted () {
			const options = [
				{ el: this.$refs['public-wall'] },
			]
			this.$smoothReflow(options)
			this.matchHeights()
			window.addEventListener('resize', this.resize)
		},
		updated () {
			// update new image height to match others
			this.matchHeights()
		},
		computed: {
			...mapState({
				'imagesLength': state => state.wall.images.length > 0 ? state.wall.images.length : 0,
				'images': state => state.wall.images.length > 0 ? _.chunk(state.wall.images, 4) : [],
				'loading': state => state.user.loading,
			}),
		},
		methods: {
			// constantly scale height of squares in grid to maintain aspect ratio
			...mapActions({
				selectImageForModal: 'wall/selectImageForModal',
				fetchImage: 'wall/fetchImage',
			}),
			showImageModal(id) {
				this.fetchImage(id)
				this.$router.push(`/profile/${this.$route.params.user}/${id}`)
			},
			resize() {
				if (this.$refs['item'] != null) {
					this.$refs['item'].map(item => {
						item.style.height = `${item.clientWidth}px`
					})
				}
			},
			matchHeights() {
				if (this.$refs['item'] != null) {
					// make all items squares
					this.$refs['item'].map(item => {
						item.style.height = `${item.clientWidth}px`
					})
					// make sure image is always filling up square
					this.$refs['item-image'].map(itemImage => {
						itemImage.style.height = `${itemImage.clientWidth}px`
						// if height is greater than width, scale to width
						if (itemImage.clientHeight > itemImage.clientWidth) {
							itemImage.style.width = '100%'
							itemImage.style.height = 'auto'
						} else {
							itemImage.style.width = 'auto'
							itemImage.style.height = '100%'
						}
					})
				}
			},
		},
	}

</script>

<template>
	<div class='public-wall' ref='public-wall'>
		<div v-show='images != null' class='wall-container'>
			<div class='row' v-for='set in images'>
				<a class='item' v-for='image in set' ref='item' @click='showImageModal(image.id)' :key='image.id'>
					<img :src='image.data' ref='item-image'/>
				</a>
			</div>
		</div>
	</div>
</template>