const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean, } = require('graphql')

const {
  getCharacters,
  getTvChars,
  getDad,
  getMom,
  renderSpouse,
  getSpouse } = require('../src/characters.js')

const charType = new GraphQLObjectType({
  name: 'Character',
  description: 'Exhaustive list of characters from the show',
  fields: {
    Id: {
      type: GraphQLID,
      description: 'The id of the character',
    },
    Name: {
      type: GraphQLString,
      description: 'The name of the character',
    },
    gender: {
      type: GraphQLString,
      description: 'Gender of the character',
    },
    Culture: {
      type: GraphQLString,
      description: 'Culture followed by the character',
    },
    Born: {
      type: GraphQLString,
      description: 'Date of birth of the character',
    },
    Died: {
      type: GraphQLString,
      description: 'Date of death of the character',
    },
    Mother: {
      type: GraphQLString,
      description: 'Culture followed by the character',
    },
    Father: {
      type: GraphQLString,
      description: 'Culture followed by the character',
    },
    Spouse: {
      type: GraphQLInt,
      description: 'Culture followed by the character',
    },
  }
})

exports.charType = charType
