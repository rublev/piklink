<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'
	import smoothReflow from 'vue-smooth-reflow'

	export default {
		name: 'wall',
		mixins: [ smoothReflow ],
		beforeDestory () {
			window.removeEventListener('resize', this.resize)
		},
		mounted () {
			const options = [
				{ el: this.$refs['wall'] },
			]
			this.matchHeights()
			this.$smoothReflow(options)
			window.addEventListener('resize', this.resize)
		},
		updated () {
			// update new image height to match others
			console.log('updated height')
			this.matchHeights()
		},
		watch: {
			images() {
				console.log('updated images')
			}
		},
		computed: {
			...mapState({
				'imagesLength': state => state.wall.images.length > 0 ? state.wall.images.length : 0,
				'images': state => state.wall.images.length > 0 ? _.chunk(state.wall.images, 4) : [],
				'loading': state => state.user.loading,
				'publicUsername': state => state.public.username,
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
				this.$router.push(`/profile/${this.publicUsername}/${id}`)
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
					let itemWidth = null
					this.$refs['item'].map(item => {
						itemWidth = `${item.clientWidth}px`
						item.style.height = itemWidth
					})
					// make sure image is always filling up square
					this.$refs['item-image'].map(itemImage => {
						if (itemImage.clientHeight > itemImage.clientWidth) {
							itemImage.style.width = itemWidth
						} else {
							itemImage.style.height = itemWidth
						}
					})
				}
			},
		},
	}

</script>

<template>
	<div class='wall' ref='wall'>
		<div v-show='images != null' class='wall-container'>
			<div class='row' v-for='set in images'>
				<a class='item' v-for='image in set' ref='item' @click='showImageModal(image.id)' :key='image.id'>
					<img :src='image.data' ref='item-image'/>
				</a>
			</div>
		</div>
	</div>
</template>