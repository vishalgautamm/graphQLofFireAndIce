const books = require('../data/books.json')
const characters = require("../data/character.json")
const { characters2 } = require('./characters.js')
const houses = require('../data/houses.json')

const { booksById, charsById, housesById } = require('./util.js')

const getBooks = () => new Promise(resolve => resolve(books))

const getBookById = id => new Promise(resolve => {
  const parseId = parseInt(id)
  const [book] = books.filter(book => book.Id === parseId)
  resolve(book)
})

console.log(characters2[100])


exports.getBooks = getBooks;
exports.getBookById = getBookById;


