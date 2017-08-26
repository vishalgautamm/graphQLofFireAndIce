const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean, } = require('graphql')

const houseType = new GraphQLObjectType({
  name: 'House',
  description: 'Nine great houses from Game of thrones',
  fields: {
    Id: {
      type: GraphQLID,
      description: 'url of the page',
    },
    Name: {
      type: GraphQLString,
      description: 'Name of the house',
    },
    Region: {
      type: GraphQLString,
      description: 'Region under control of the house',
    },
    "CoatOfArms": {
      type: GraphQLString,
      description: "the distinctive heraldic bearings",
    },
    "Words": {
      "type": GraphQLString,
      description: "Wise words of the house",
    },
  }
})

exports.houseType = houseType
