import anime from 'animejs'

const install = (Vue, options) => {
	Vue.prototype.$anime = anime
}

export default install