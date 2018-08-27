<script>

	export default {
		name: 'signin',
		data () {
			return {
				blockstack: window.blockstack
			}
		},
		mounted () {
			if (this.blockstack.isUserSignedIn()) {
				this.$router.push('/dashboard')
			}
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
	<div class='signin'>
		<button @click.prevent='signIn'>sign in</button>
	</div>
</template>