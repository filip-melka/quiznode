require('dotenv').config()
const OpenAI = require('openai')

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
})

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

const generateQuestions = async (req, res) => {
	const { markdown } = req.body

	const message = markdown + '\n' + prompt

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: message,
			},
		],
		max_tokens: 200,
	})

	const questions = []

	response.choices[0].message.content
		.replaceAll(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
		.split('\n\n')
		.forEach((section) => {
			const question = section.match(questionRegex)
			const options = section.match(optionsRegex) || []
			const correctAnswer = section.match(correctAnswerRegex)

			if (question && options.length > 0 && correctAnswer) {
				questions.push({
					question: question[0].substring(question[0].indexOf(' ') + 1),
					options,
					correctAnswer: correctAnswer[0].slice(-1),
				})
			}
		})

	res.status(200).json({
		questions,
	})
}

module.exports = { generateQuestions }
