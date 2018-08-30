<style lang='scss' scoped src='./style.scss' />

<script>

	export default {
		name: 'loader',
		mounted () {
			this.$anime({
			  targets: '.logo path',
			  strokeDashoffset: [this.$anime.setDashoffset, 0],
			  easing: 'easeInOutSine',
			  duration: 2500,
			  delay: function(el, i) { return i * 250 },
			  direction: 'alternate',
			  loop: true
			});
		},
	}

</script>

<template>
	<div class='loader' ref='loader'>
		<svgicon name='logo/head-graphic-lines' class='logo' :original='false'></svgicon>
	</div>
</template>