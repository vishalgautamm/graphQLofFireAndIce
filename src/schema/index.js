const {
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
}  = require('graphql')

const { getData, getDataById, addGender, findByName } = require('./apiHelper')

const booksJSON = require('../data/books.json')
const characterJSON = addGender(require('../data/character.json'))
const houseJSON = require('../data/houses.json')


const bookType = require('./types/book')
const characterType = require('./types/character')
const houseType = require('./types/house')


const nameConnection = (type, jsonData) => ({
  type: type,
  args: {
    name: {
      type: GraphQLString
    }
  },
  resolve: (parentVal, args) => findByName(jsonData, args.name)
})

const rootConnection = (type, jsonData) => ({
  type: type,
  args: { 
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (parentVal, args) => getDataById(jsonData, args.id) 
})

const rootConnectionList = (type, jsonData) => ({
  type: new GraphQLList(type),
  resolve: () => getData(jsonData)
})

const RootQuery  = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    houses: rootConnectionList(houseType, houseJSON),
    house: rootConnection(houseType, houseJSON),
    characters: rootConnectionList(characterType, characterJSON),
    character: rootConnection(characterType, characterJSON),
    characterByName: nameConnection(characterType, characterJSON),
    books: rootConnectionList(bookType, booksJSON),
    book: rootConnection(bookType, booksJSON),
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});