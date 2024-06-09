export async function fetchQuestions(markdown) {
	console.log(markdown)
	const { questions } = await fetch('http://localhost:4000/openai/questions', {
		method: 'POST',
		body: JSON.stringify({
			markdown,
		}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json())

	return questions
}
