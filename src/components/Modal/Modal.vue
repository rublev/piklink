<style lang='scss' scoped src='./style.scss' />

<script>

	export default {
		name: 'modal',
		methods: {
			handleClose() {
				this.$router.push('/dashboard')
			}
		}
	}

</script>

<template>
	<div class='modal'>
		<div class='inner'>
			<button class='close-button' @click='handleClose'>x</button>
			<slot></slot>
		</div>
	</div>
</template>