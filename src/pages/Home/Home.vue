<style lang='scss' scoped src='./style.scss' />

<script>

	import { delay } from '@/utils'

	export default {
		name: 'home',
		data: () => ({
			enableLogo: false
		}),
		async mounted () {
			if (this.blockstack.isUserSignedIn()) {
				this.$router.push('/dashboard')
			}
			this.$anime({
			  targets: '.logo path',
			  strokeDashoffset: [this.$anime.setDashoffset, 0],
			  easing: 'easeInOutSine',
			  duration: 5000,
			  delay: function(el, i) { return i * 250 },
			  direction: 'alternate',
			  loop: false
			});
			await delay(5000)
			this.enableLogo = true
		},
		methods: {
			signIn () {
				const blockstack = this.blockstack
				const redirectURI = `${window.location.origin}/dashboard`
				const manifestURI = `${window.location.origin}/manifest.json`
				const scopes = ['store_write', 'publish_data', 'email']
				blockstack.redirectToSignIn(redirectURI, manifestURI, scopes)
			}
		}
	}

</script>

<template>
	<div class='home'>
		<div class='container'>
			<div class='logo-container'>
				<svgicon name='logo/head-graphic-lines-color' class='logo' :original='true'></svgicon>
				<svgicon name='logo/text-color' :class="{'logo-text': true, 'enable-logo': enableLogo}" :original='true'></svgicon>
			</div>
			<button class='button purple' @click.prevent='signIn'>Sign In</button>
		</div>
	</div>
</template>