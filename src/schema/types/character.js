const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLID,
	GraphQLString
} = require('graphql')

const bookType = require('./book.js')
const houseType = require('./house.js')
const booksJSON = require('../../data/books.json')
const houseJSON = require('../../data/houses.json')

const { getDataById, getDataListById, addGender } = require('../apiHelper')
const charactersJSON = addGender(require('../../data/character.json'))

const charType = new GraphQLObjectType({
	name: 'Character',
	description: 'Exhaustive list of characters from the show',
	fields: () => ({
		Id: {
			type: GraphQLID,
			description: 'The id of the character'
		},
		Name: {
			type: GraphQLString,
			description: 'The name of the character'
		},
		gender: {
			type: GraphQLString,
			description: 'See if the Character is male or female'
		},
		Culture: {
			type: GraphQLString,
			description: 'Culture followed by the character'
		},
		Born: {
			type: GraphQLString,
			description: 'Date of birth of the character'
		},
		Died: {
			type: GraphQLString,
			description: 'Date of death of the character'
		},

		Titles: {
			type: new GraphQLList(GraphQLString),
			description: 'Different titles held by the character'
		},

		Aliases: {
			type: new GraphQLList(GraphQLString),
			description: 'Different Aliases held by the character'
		},

		PlayedBy: {
			type: new GraphQLList(GraphQLString),
			description: 'Name of the Actor'
		},
		TvSeries: {
			type: new GraphQLList(GraphQLString),
			description: 'Name of the Actor'
		},

		father: {
			type: charType,
			description: 'Characters Father',
			resolve: (parentVal, args) =>
				getDataById(charactersJSON, parentVal.Father)
		},
		mother: {
			type: charType,
			description: 'Characters Father',
			resolve: (parentVal, args) =>
				getDataById(charactersJSON, parentVal.Mother)
		},
		spouse: {
			type: charType,
			description: 'Characters spouse',
			resolve: (parentVal, args) =>
				getDataById(charactersJSON, parentVal.Spouse)
		},

		books: {
			type: new GraphQLList(bookType),
			resolve: (parentVal, args) => getDataListById(booksJSON, parentVal.Books)
		},

		povBooks: {
			type: new GraphQLList(bookType),
			resolve: (parentVal, args) =>
				getDataListById(booksJSON, parentVal.PovBooks)
		},

		children: {
			type: new GraphQLList(charType),
			resolve: (parentVal, args) =>
				getDataListById(charactersJSON, parentVal.Children)
		},

		allegiances: {
			type: new GraphQLList(houseType),
			resolve: (parentVal, args) =>
				getDataListById(houseJSON, parentVal.Allegiances)
		}
	})
})

module.exports = charType
