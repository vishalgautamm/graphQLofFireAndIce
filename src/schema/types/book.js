const {
	GraphQLInt,
	GraphQLList,
	GraphQLID,
	GraphQLObjectType,
	GraphQLString
} = require('graphql')

const { getDataById } = require('../apiHelper')
const booksJSON = require('../../data/books.json')

const bookType = new GraphQLObjectType({
	name: 'Book',
	description: 'Books written by George R. R. Martin',
	fields: () => ({
		Id: {
			type: GraphQLID,
			description: 'The id of the book'
		},
		Name: {
			type: GraphQLString,
			description: 'The name of the book'
		},
		ISBN: {
			type: GraphQLString,
			description: 'ISBN number'
		},
		NumberOfPages: {
			type: GraphQLInt,
			description: 'The number of the pages in the book'
		},
		Publisher: {
			type: GraphQLString,
			description: 'The name of the Publisher'
		},
		MediaType: {
			type: GraphQLString,
			description: 'MediaType'
		},
		Country: {
			type: GraphQLString,
			description: 'Country where the book was first published'
		},
		ReleaseDate: {
			type: GraphQLString,
			description: 'Year when the book was released'
		},

		Authors: {
			type: new GraphQLList(GraphQLString),
			description: 'Authors of the book'
		},
		previous: {
			type: bookType,
			description: 'Previous book',
			resolve: (parentVal, args) =>
				getDataById(booksJSON, parentVal.PrecededById)
		},
		next: {
			type: bookType,
			description: 'Next book',
			resolve: (parentVal, args) => getDataById(booksJSON, parentVal.FollowedBy)
		}
	})
})

module.exports = bookType
