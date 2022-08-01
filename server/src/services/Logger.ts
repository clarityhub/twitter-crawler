function debug(...args) {
	if (process.env.DEBUG === 'true') {
		console.log(...args);
	}
}

function debugError(...args) {
	if (process.env.DEBUG === 'true') {
		console.error(...args);
	}
}

export { debug, debugError };