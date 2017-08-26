const books = require('../data/books.json')
const characters = require('../data/character.json')
const houses = require('../data/houses.json')

const idReducer = (acc, curr) => {
	acc.set(curr.Id, curr)
	return acc
}
const renderCollById = coll => coll.reduce(idReducer, new Map())

const booksById = renderCollById(books)
const charsById = renderCollById(characters)
const housesById = renderCollById(houses)

exports.idReducer = idReducer
exports.renderCollById = renderCollById
exports.booksById = booksById
exports.charsById = charsById
exports.housesById = housesById
