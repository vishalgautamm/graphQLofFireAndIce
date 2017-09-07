const express = require('express')
const graphQLHTTP = require('express-graphql')
const schema = require('./src/schema')

const app = express()
const PORT = process.env.PORT || 3000

app.use(
	'/*',
	graphQLHTTP({
		schema,
		graphiql: true
	})
)

// Listen for incoming HTTP requests
app.listen(PORT, () => `Listening to port ${PORT}`)
