export default function (keyword, value) {
	const nodes = []
	if (keyword.toUpperCase().startsWith(value.toUpperCase())) {
		const key1 = keyword.slice(0, value.length)
		const key2 = keyword.slice(value.length)
		nodes.push({
			name: 'span',
			attrs: { style: 'color: #26ce8a; font-size: 14px;' },
			children: [{ type: 'text', text: key1 }]
		}, {
			name: 'span',
			attrs: { style: 'color: #000000; font-size: 14px;' },
			children: [{ type: 'text', text: key2 }]
		})
	} else {
		nodes.push({
			name: 'span',
			attrs: { style: 'color: #00000; font-size: 14px;' },
			children: [{ type: 'text', text: keyword }]
		})
	}
	return nodes
}