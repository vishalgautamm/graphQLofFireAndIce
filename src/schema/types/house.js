const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLID,
	GraphQLString
} = require('graphql')

const { getDataById, getDataListById, addGender } = require('../apiHelper')

const houseJSON = require('../../data/houses.json')
const charactersJSON = addGender(require('../../data/character.json'))

const houseType = new GraphQLObjectType({
	name: 'House',
	description: 'Nine great houses from Game of thrones',
	fields: () => {
		const charType = require('./character.js')
		return {
			Id: {
				type: GraphQLID,
				description: 'url of the page'
			},
			Name: {
				type: GraphQLString,
				description: 'Name of the house'
			},

			Seats: {
				type: new GraphQLList(GraphQLString)
			},

			Region: {
				type: GraphQLString,
				description: 'Region under control of the house'
			},

			CoatOfArms: {
				type: GraphQLString,
				description: 'the distinctive heraldic bearings'
			},

			Words: {
				type: GraphQLString,
				description: 'Wise words of the house'
			},

			Founded: {
				type: GraphQLString,
				description: 'Year the House was founded'
			},

			Overlord: {
				type: houseType,
				resolve: (parentVal, args) => getDataById(houseJSON, parentVal.Overlord)
			},

			DiedOut: {
				type: GraphQLString,
				description: 'Year the House died'
			},

			AncestralWeapons: {
				type: new GraphQLList(GraphQLString),
				description: 'List of ancestral weapons owned by the house'
			},

			cadetBranches: {
				type: new GraphQLList(houseType),
				resolve: (parentVal, args) =>
					getDataListById(houseJSON, parentVal.CadetBranches)
			},

			CurrentLord: {
				type: charType,
				resolve: (parentVal, args) =>
					getDataById(charactersJSON, parentVal.CurrentLord)
			},

			founder: {
				type: charType,
				description: 'Name of the founder of the house',
				resolve: (parentVal, args) =>
					getDataById(charactersJSON, parentVal.Founder)
			},

			heir: {
				type: charType,
				description: 'Heir of the house',
				resolve: (parentVal, args) =>
					getDataById(charactersJSON, parentVal.Heir)
			}
		}
	}
})

module.exports = houseType
