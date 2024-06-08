import { OPENAI_KEY } from '../openaiConfig.js'

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
	console.log(markdown)
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
	}).then((res) => res.json())

	console.log(response)
	console.log(response.choices[0].message.content)

	return data
}
