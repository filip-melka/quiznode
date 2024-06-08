import { OPENAI_KEY } from '../openaiConfig.js'

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
	const message = markdown + '\n' + prompt

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
	})
		.then((res) => res.json())
		.then((data) =>
			data.choices[0].message.content.replaceAll(
				/\[([^\]]+)\]\([^\)]+\)/g,
				'$1'
			)
		)

	const data = []

	response.split('\n\n').forEach((section) => {
		const question = section.match(questionRegex)
		const options = section.match(optionsRegex) || []
		const correctAnswer = section.match(correctAnswerRegex)

		if (question && options.length > 0 && correctAnswer) {
			data.push({
				question: question[0].substring(question[0].indexOf(' ') + 1),
				options,
				correctAnswer: correctAnswer[0].slice(-1),
			})
		}
	})

	return data
}
