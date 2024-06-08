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

export async function fetchQuestions() {
	return data
}
