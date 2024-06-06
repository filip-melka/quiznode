chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	chrome.tabs.sendMessage(tabs[0].id, { action: 'getPostDetails' }, (res) => {
		console.log(res)
	})
})
