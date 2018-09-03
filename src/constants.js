export let
	URL_PREFIX

switch(true) {
	case (process.env.NODE_ENV === 'development'):
	case (process.env.NODE_ENV === '"development"'):
		URL_PREFIX = 'http://localhost:8080'
		break
	case (process.env.NODE_ENV === 'production'):
	case (process.env.NODE_ENV === '"production"'):
		URL_PREFIX = 'https://piklink.netlify.com'
		break
}