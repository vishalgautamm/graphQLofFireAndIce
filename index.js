const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLList,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean
} = require('graphql')

const { bookType } = require('./schema/booksSchema.js')
const { charType } = require('./schema/characterSchema.js')
const { houseType } = require('./schema/houseSchema.js')

const { getBooks, getBookById } = require('./src/books.js')
const { getHouses, getHouseById, getSevenKingdoms } = require('./src/houses.js')
const {
	getCharacters,
	getTvChars,
	getCharsById
} = require('./src/characters.js')

const PORT = process.env.PORT || 3000
const server = express()

const queryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'The root query type',
	fields: {
		allBooks: {
			type: new GraphQLList(bookType),
			resolve: getBooks
		},

		book: {
			type: bookType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'The id of the book.'
				}
			},
			resolve: (_, args) => getBookById(args.id)
		},

		allHouses: {
			type: new GraphQLList(houseType),
			resolve: getHouses
		},

		sevenKingdoms: {
			type: new GraphQLList(houseType),
			resolve: getSevenKingdoms
		},

		house: {
			type: houseType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'The id of the the house'
				}
			},
			resolve: (_, args) => getHouseById(args.id)
		},

		allCharacters: {
			type: new GraphQLList(charType),
			resolve: getCharacters
		},

		tvCharacters: {
			type: new GraphQLList(charType),
			resolve: getTvChars
		},

		character: {
			type: charType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'The id of the character'
				}
			},
			resolve: (_, args) => getCharsById(args.id)
		}
	}
})

const schema = new GraphQLSchema({
	query: queryType
})

server.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
)

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
