<style lang='scss' scoped src='./style.scss' />

<script>

	import Notification from '@/components/Navigation/Navigation'

	import { mapState, mapActions } from 'vuex'
	import md5 from 'md5'
	import smoothReflow from 'vue-smooth-reflow'

	export default {
		name: 'upload',
		mixins: [ smoothReflow ],
		components: {
			Notification
		},
		computed: {
			...mapState({
				noImages: state => state.wall.images.length === 0,
				image: state => state.upload.image,
				imageName: state => state.upload.imageName,
				drag: state => state.upload.drag,
			})
		},
		beforeDestory () {
			window.removeEventListener('paste', this.onPaste)
			window.removeEventListener('drop')
			window.removeEventListener('dragover')
		},
		mounted () {
			const that = this
			window.addEventListener('paste', this.onPaste)
			const options = [
				{ el: this.$refs['content-box'] },
				// { el: this.$refs['upload'] },
			]
			this.$smoothReflow(options)
			window.addEventListener('drop', event => {
				event.preventDefault()
				this.dropImage(event)
			}, false)
			window.addEventListener('dragover', event => {
				event.preventDefault()
			}, false)
		},
		methods: {
			...mapActions({
				uploadImage: 'upload/uploadImage',
				resetAccountImages: 'upload/resetAccountImages',
				setImage: 'upload/setImage',
				cancelImage: 'upload/cancelImage',
				onPaste: 'upload/onPaste',
				dropImage: 'upload/dropImage',
			}),
		}
	}

</script>

<template>
	<div :class="{ upload: true, drag, image, 'no-images': noImages && !image }" ref='upload'>
		<transition name='fade'>
			<img v-show='image' :src='image' ref='image' class='image-file'/>
		</transition>
		<div class='content-box' ref='content-box' :class='{ image, show: !image }'>
			<div v-if='!image' class='slogan'>
				<span class='strong'>Click</span>,
				<span class='strong'>drag & drop,</span> or
				<span class='strong'>paste</span> an image from your clipboard anywhere in this header.
			</div>
		</div>
		<div class='upload-boxes'>
			<div class='upload-container'>
				<input type='file' id='input-file' class='input-file' @change='setImage'/>
				<label v-if='!image' class='button purple' for='input-file'>
					<span>Select file!</span>
				</label>
				<button v-if='image' class='green icon upload-btn' @click='uploadImage(image)'>
					<svgicon name='icon/signin' class='icon' :original='false'></svgicon>
					<span>
						Upload <span class='strong'>{{ imageName }}</span>
					</span>
				</button>
			</div>
			<div class='cancel-container'>
				<button @click='cancelImage()' class='blank purple'>Cancel</button>
				<button class='blank' disabled>or</button>
				<button @click='resetAccountImages' class='blank purple'>Reset All Images</button>
			</div>
		</div>
	</div>
</template>