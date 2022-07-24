export default (fn, delay, immediate = false) => {
	let timer = null
	let isInvoke = false

	function _debounce(...args) {
		return new Promise(resolve => {

			if (timer) clearTimeout(timer)
			timer = null

			if (immediate && !isInvoke) {
				const res = fn.apply(this, args)
				resolve(res)
				isInvoke = true
			} else {
				timer = setTimeout(() => {
					const res = fn.apply(this, args)
					resolve(res)
					timer = null
					isInvoke = true
				}, delay);
			}
		})
	}

	_debounce.cancel = function () {
		if (timer) clearTimeout(timer)
		timer = null
		isInvoke = false
	}

	return _debounce
}