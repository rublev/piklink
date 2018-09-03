<style lang='scss' scoped src='./style.scss' />

<script>

	// import Notification from '@/components/Navigation/Navigation'

	import { mapState } from 'vuex'
	// import md5 from 'md5'
	// import smoothReflow from 'vue-smooth-reflow'

	export default {
		name: 'user-info',
		computed: {
			...mapState({
				name: state => state.public.name,
				avatar: state => state.public.avatar,
				username: state => state.public.username,
			}),
		},
		// mixins: [ smoothReflow ],
		// components: {
		// 	Notification
		// },
		// computed: {
		// 	...mapState({
		// 		noImages: state => state.wall.images.length === 0,
		// 		image: state => state.upload.image,
		// 		imageName: state => state.upload.imageName,
		// 		drag: state => state.upload.drag,
		// 	})
		// },
		// beforeDestory () {
		// 	window.removeEventListener('paste', this.onPaste)
		// 	window.removeEventListener('drop')
		// 	window.removeEventListener('dragover')
		// },
		// mounted () {
		// 	const that = this
		// 	window.addEventListener('paste', this.onPaste)
		// 	const options = [
		// 		{ el: this.$refs['content-box'] },
		// 		// { el: this.$refs['upload'] },
		// 	]
		// 	this.$smoothReflow(options)
		// 	window.addEventListener('drop', event => {
		// 		event.preventDefault()
		// 		this.dropImage(event)
		// 	}, false)
		// 	window.addEventListener('dragover', event => {
		// 		event.preventDefault()
		// 	}, false)
		// },
		// methods: {
		// 	...mapActions({
		// 		uploadImage: 'upload/uploadImage',
		// 		resetAccountImages: 'upload/resetAccountImages',
		// 		setImage: 'upload/setImage',
		// 		cancelImage: 'upload/cancelImage',
		// 		onPaste: 'upload/onPaste',
		// 		dropImage: 'upload/dropImage',
		// 	}),
		// }
	}

</script>

<template>
	<div class='user-info'>
		<img v-if='avatar !== null' :src='avatar' class='avatar'>
		<div class='user-details'>
			<div class='name'>
				{{ name }}
			</div>
			<div class='username'>
				{{ username }}
			</div>
		</div>
	</div>
</template>