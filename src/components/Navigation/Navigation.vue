<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapActions } from 'vuex'

	import FixedHeader from '@/components/FixedHeader'

	export default {
		name: 'navigation',
		components: {
			FixedHeader,
		},
		data: () => ({
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
						<li>
							<router-link class='whitepaper' to='/whitepaper' @click.native='toggleMenu()'>
								Whitepaper
							</router-link>
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
					<li>
						<router-link to='/upload' :class='{ button: true, large: true, blue: true }'>
							Upload
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</FixedHeader>
</template>