const data = [
	{
		question: 'What is Hashnode primarily known for?',
		options: [
			'A) Social networking',
			'B) Blogging platform',
			'C) E-commerce',
			'D) Cloud storage',
		],
		correctAnswer: 'B',
	},
	{
		question: 'Which of the following features is NOT offered by Hashnode?',
		options: [
			'A) Custom domain support',
			'B) Built-in newsletter integration',
			'C) Code collaboration tools',
			'D) SEO optimization features',
		],
		correctAnswer: 'C',
	},
	{
		question: 'Which of these is a key benefit of using Hashnode for blogging?',
		options: [
			'A) Access to an exclusive audience',
			'B) Requires no coding knowledge to set up',
			'C) Offers cloud storage solutions',
			'D) Provides e-commerce integration',
		],
		correctAnswer: 'B',
	},
]

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	chrome.tabs.sendMessage(tabs[0].id, { action: 'getPostDetails' }, (res) => {
		const host = res.host
		const slug = res.slug

		if (host && slug) {
			fetchMarkdown(slug, host)
		}
	})
})

const QUESTION = document.getElementById('question')
const OPTIONS = document.getElementById('options')

let questions
let questionIndex
let noOfCorrectAnswers = 0

async function fetchMarkdown(slug, host) {
	const query = `#graphql
		query Publication($slug: String!, $host: String!) { 
			publication(host: $host){
				post(slug: $slug){
					content {
						markdown
					}
				}
			}
		}
	`
	const variables = {
		slug,
		host,
	}

	const markdown = await fetch('https://gql.hashnode.com', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({ query, variables }),
	})
		.then((res) => res.json())
		.then(({ data }) => data.publication.post.content.markdown)

	console.log(markdown)
}

setTimeout(() => {
	fetchQuestions()
}, 2000)

function setDisplayProperty(id, value) {
	document.getElementById(id).style.display = value
}

async function fetchQuestions() {
	questions = data
	questionIndex = -1
	startQuiz()
}

function startQuiz() {
	setDisplayProperty('loader', 'none')
	nextQuestion()
	setDisplayProperty('quiz', 'flex')
}

function setProgressBar(percentage) {
	document.getElementById('progress-bar').firstChild.style.width = `${
		percentage * 100
	}%`
}

function nextQuestion() {
	/* hide 'next' button */
	setDisplayProperty('next-btn', 'none')

	questionIndex++

	if (questionIndex < data.length) {
		setProgressBar((questionIndex + 1) / questions.length)

		/* set questions */
		QUESTION.innerText = questions[questionIndex].question

		/* remove previous option buttons */
		OPTIONS.innerHTML = ''

		/* create new option buttons */
		questions[questionIndex].options.forEach((option) => {
			const btn = document.createElement('button')
			btn.innerHTML = option
			btn.addEventListener('click', () => evaluateAnswer(btn))
			OPTIONS.appendChild(btn)
		})

		OPTIONS.className = ''
	} else {
		showResult()
	}
}

function evaluateAnswer(btn) {
	/* disable options buttons */
	OPTIONS.className = 'disabled'

	if (btn.innerText.startsWith(questions[questionIndex].correctAnswer)) {
		noOfCorrectAnswers++
		btn.className = 'correct'
	} else {
		btn.className = 'incorrect'

		/* loop through the options */
		for (
			var option = OPTIONS.firstChild;
			option !== null;
			option = option.nextSibling
		) {
			if (option.innerText.startsWith(questions[questionIndex].correctAnswer)) {
				option.className = 'correct'
			}
		}
	}

	/* display 'next' button */
	setDisplayProperty('next-btn', 'block')
}

document.getElementById('next-btn').addEventListener('click', nextQuestion)

function showResult() {
	setDisplayProperty('quiz', 'none')

	const spans = document.querySelectorAll('#result span')

	spans[0].innerHTML = noOfCorrectAnswers
	spans[1].innerHTML = `/ ${questions.length}`

	setDisplayProperty('result', 'flex')
}

document
	.getElementById('close-btn')
	.addEventListener('click', () => window.close())
