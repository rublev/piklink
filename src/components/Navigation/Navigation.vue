<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapActions } from 'vuex'

	import FixedHeader from '@/components/FixedHeader'

	export default {
		name: 'navigation',
		props: ['user'],
		components: {
			FixedHeader,
		},
		data: () => ({
			blockstack: window.blockstack,
			isFixed: false,
			showMenu: false,
			threshold: {
				type: Number,
				default: 0,
				required: false
			}
		}),
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
						</li>
						<li>
							<router-link to='/about' @click.native='toggleMenu()'>
								About
							</router-link>
						</li>
						<li>
							<router-link to='/contact' @click.native='toggleMenu()'>
								Contact
							</router-link>
						</li>
						<li class='blank'></li>
						<li class='user' v-if='user !== null'>
							<div class='avatar'>
								<img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class='avatar'>
							</div>
							<div class='user-details'>
								<div class='name'>
									{{
										user.name() ? user.name() : 'Nameless Person'
									}}
								</div>
								<div class='username'>
									{{
										user.username ? user.username : user.identityAddress
									}}
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
					<li>
						<router-link to='/about'>
							About
						</router-link>
					</li>
					<li>
						<router-link to='/contact'>
							Contact
						</router-link>
					</li>
					<li class='blank'></li>
					</li>
					<li class='user' v-if='user !== null'>
						<div class='user-details'>
							<div class='name'>
								{{
									user.name() ? user.name() : 'Nameless Person'
								}}
							</div>
							<div class='username'>
								{{
									user.username ? user.username : user.identityAddress
								}}
							</div>
						</div>
						<div class='avatar'>
							<img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class='avatar'>
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