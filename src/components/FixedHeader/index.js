let $
let tag

export default {
	name: 'fixed-header',
	data: () => ({
		threshold: 0
	}),
	mounted () {
		$ = (e) => document.querySelector(e) // poor mans jquery
		tag = ( !window.chrome && 'WebkitAppearance' in document.documentElement.style ) ? 'body' : 'html'
		$(tag).scrollTop = 0;
		this.main()
	},
	methods: {
		main () {
			this.check = () => {
				this.$emit('update:fixed', $(tag).scrollTop > this.threshold)
			}
			window.addEventListener('scroll', this.check)
		}
	},
	beforeDestory () {
		window.removeEventListener('scroll', this.check)
	},
	render(h) {
		return this.$slots.default[0] // can't have multiple root nodes
	}
}