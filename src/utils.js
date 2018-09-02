export const delay = ms => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/* RFC4122 version 4 compliant uuid generation */
export const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}