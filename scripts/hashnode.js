export async function fetchMarkdown(slug, host) {
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

	return markdown
}
