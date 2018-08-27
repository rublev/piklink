<script>

	export default {
		name: 'dashboard',
		data: () => ({
			blockstack: window.blockstack,
			user: null,
			userData: null
		}),
		mounted () {
			const blockstack = this.blockstack
			if (blockstack.isUserSignedIn()) {
				this.userData = blockstack.loadUserData()
				console.log('1 userData', this.userData)
				this.user = new blockstack.Person(this.userData.profile)
				this.user.username = this.userData.username
			} else if (blockstack.isSignInPending()) {
				blockstack.handlePendingSignIn()
					.then((userData) => {
						console.log('z userData', userData)
						window.location = window.location.origin
					})
			} else {
				window.location = window.location.origin
			}
		},
		methods: {
			signOut () {
				this.blockstack.signUserOut(window.location.origin)
			}
		}
	}

</script>

<template>
	<div>
		<div class='sign-out'>(
			<a href='#' @click.prevent='signOut'>Sign Out</a>
		)</div>
		<div v-if='user !== null'>
			<div>
				{{
					user.username ? user.username : user.identityAddress
				}}
			</div>
			<div>
				{{
					user.name() ? user.name() : 'Nameless Person'
				}}
			</div>
			<div>
				<img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class='avatar'>
			</div>
		</div>
	</div>
</template>