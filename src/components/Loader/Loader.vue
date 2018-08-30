<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState } from 'vuex'

	export default {
		name: 'loader',
		mounted () {
			this.$anime({
			  targets: '.logo path',
			  strokeDashoffset: [this.$anime.setDashoffset, 0],
			  easing: 'easeInOutSine',
			  duration: 1500,
			  delay: function(el, i) { return i * 250 },
			  direction: 'alternate',
			  loop: true
			});
		},
		computed: {
			...mapState({
				loading: state => state.user.loading,
			})
		}
	}

</script>

<template>
	<div class='loader' ref='loader'>
		<div class='wrapper'>
			<svgicon name='logo/head-graphic-lines' class='logo' :original='false'></svgicon>
			<div class='state' v-if='loading'>
				<span>Loading</span>
			</div>
			<div class='state' v-else>
				<span>Waiting for images...</span>
			</div>
		</div>
	</div>
</template>