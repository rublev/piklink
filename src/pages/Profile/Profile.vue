<!-- <style lang='scss' scoped src='./style.scss' /> -->

<script>

	import Navigation from '@/components/Navigation/Navigation'

	export default {
		name: 'profile',
		components: {
			Navigation,
		},
		mounted () {
			const username = `${this.$route.params.user}.id.blockstack`
			console.log(username)
			console.log(this.blockstack)
		}
	}

</script>

<template>
	<div class='profile'>
		<Navigation />
		profile
	</div>
</template>