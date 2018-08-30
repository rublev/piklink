<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'

	import FixedHeader from '@/components/FixedHeader'

	export default {
		name: 'navigation',
		components: {
			FixedHeader,
		},
		data: () => ({
			isFixed: false,
			showMenu: false
		}),
		computed: {
			...mapState({
				'name': state => state.user.profile !== null ? state.user.profile.name() : null,
				'avatarUrl': state => state.user.profile !== null ? state.user.profile.avatarUrl() : null,
				'username': state => state.user.data !== null ? (state.user.data.username || state.user.data.identityAddress) : null,
			}),
		},
		methods: {
			toggleMenu() {
				this.showMenu = !this.showMenu;
				this.toggleBodyClass();
			},
			toggleBodyClass() {
				const el = document.body;
				if (this.showMenu) {
					el.classList.add('hide-scroll', 'menu-open');
				} else {
					el.classList.remove('hide-scroll', 'menu-open');
				}
			},
			signOut () {
				this.blockstack.signUserOut(window.location.origin)
			}
		}
	}

</script>

<template>
	<FixedHeader :fixed.sync='isFixed'>
		<div :class="{ 'nav': true, 'is-fixed': isFixed }">
			<div class='container'>
				<svgicon name='logo/full' class='logo-full' :original='true'></svgicon>
				<svgicon name='icon/menu' class='menu-icon' :original='false' @click='toggleMenu()'></svgicon>
				<transition name='fade'>
					<ul v-if='showMenu' :class="{ 'show': showMenu }">
						<svgicon name='logo/bw' class='logo-full' :original='true'></svgicon>
						<ion-icon class='close' name='close' @click='toggleMenu()'></ion-icon>
						<li>
							<router-link to='/dashboard' exact @click.native='toggleMenu()'>
								Dashboard
							</router-link>
						<!-- </li>
						<li>
							<router-link to='/about' @click.native='toggleMenu()'>
								About
							</router-link>
						</li>
						<li>
							<router-link to='/contact' @click.native='toggleMenu()'>
								Contact
							</router-link> -->
						</li>
						<li class='blank'></li>
						<li class='user'>
							<div class='avatar'>
								<img v-if='avatarUrl !== null' :src='avatarUrl' class='avatar'>
								<svgicon v-if='avatarUrl === null' name='logo/head-bw' class='icon' :original='true'></svgicon>
							</div>
							<div class='user-details'>
								<div class='name'>
									{{ name }}
								</div>
								<div class='username'>
									{{ username }}
								</div>
							</div>
							<div class='blank'></div>
							<div class='signout'>
								<svgicon name='icon/signout' class='icon' :original='true' @click.native='signOut()'></svgicon>
							</div>
						</li>
					</ul>
				</transition>
				<ul>
					<li>
						<router-link to='/dashboard' exact>
							Dashboard
						</router-link>
					</li>
					<!-- <li>
						<router-link to='/about'>
							About
						</router-link>
					</li>
					<li>
						<router-link to='/contact'>
							Contact
						</router-link>
					</li> -->
					<li class='blank'></li>
					</li>
					<li class='user'>
						<div class='user-details'>
							<div class='name'>
								{{ name }}
							</div>
							<div class='username'>
								{{ username }}
							</div>
						</div>
						<div class='avatar'>
							<img v-if='avatarUrl !== null' :src='avatarUrl' class='avatar'>
							<svgicon v-if='avatarUrl === null' name='logo/head-bw' class='icon' :original='true'></svgicon>
						</div>
						<div class='signout'>
							<svgicon name='icon/signout' class='icon' :original='true' @click.native='signOut()'></svgicon>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</FixedHeader>
</template>