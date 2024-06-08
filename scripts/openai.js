import { OPENAI_KEY } from '../openaiConfig.js'

const exampleResponse = `
Question: Where is the code related to the header section shown in the image located at?
A) layout.tsx
B) site-header.tsx
C) footer.tsx
D) index.tsx
Correct answer: A

Question: Which component is responsible for the search functionality in the header?
A) MainNav
B) MobileNav
C) CommandMenu
D) ModeToggle
Correct answer: C

Question: Which file contains the code snippet for the header section?
A) layout.tsx
B) index.tsx
C) site-header.tsx
D) footer.tsx
Correct answer: C

Question: Who is the author of the article providing information on the header development?
A) Ramu Narasinga
B) John Doe
C) Jane Smith
D) Michael Johnson
Correct answer: A
`

const questionRegex = /^Question.*$/gm
const optionsRegex = /^([ABCD]\) ).*$/gm
const correctAnswerRegex = /^Correct answer: [ABCD]$/gm

const prompt = `
Could you come up with multiple choice questions based on the markdown content provided? Here is an example format:

Question: What is Hashnode primarily known for?
A) Social networking
B) Blogging platform
C) E-commerce
D) Cloud storage
Correct answer: B
`

export async function fetchQuestions(markdown) {
	/* const message = markdown + '\n' + prompt

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_KEY}`,
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: message,
				},
			],
			max_tokens: 200,
		}),
	}).then((res) => res.json()).then(data => data.choices[0].message.content)

	console.log(response) */

	const data = []

	exampleResponse.split('\n\n').forEach((section) => {
		const question = section.match(questionRegex)[0]
		const options = section.match(optionsRegex)
		const correctAnswer = section.match(correctAnswerRegex)[0]

		if (question.length > 0 && options.length > 0 && correctAnswer.length > 0) {
			data.push({
				question: question.substring(question.indexOf(' ') + 1),
				options,
				correctAnswer: correctAnswer.slice(-1),
			})
		}
	})

	console.log(data)

	return data
}
