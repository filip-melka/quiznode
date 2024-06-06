window.addEventListener('focus', function () {
	console.log(12345)
	checkPage()
})

function getHashnodeAuthor() {
	const links = document.getElementsByTagName('link')
	for (let link of links) {
		if (link.rel === 'author' && link.href.includes('hashnode')) {
			return link.href.split('@')[1]
		}
	}

	return null
}

function checkPage() {
	const author = getHashnodeAuthor()

	if (author && chrome.runtime && !!chrome.runtime.getManifest()) {
		chrome.runtime.sendMessage({
			isEnabled: true,
		})
	} else {
		chrome.runtime.sendMessage({
			isEnabled: false,
		})
	}
}

checkPage()
