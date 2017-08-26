const books = require('../data/books.json')
const characters = require('../data/character.json')
const houses = require('../data/houses.json')

const { booksById, charsById, housesById } = require('./util.js')

const characters2 = characters.map(char => {
	if (char.IsFemale === false) {
		char.gender = 'Male'
	} else {
		char.gender = 'Female'
	}
	return char
})

const tvChars = characters2
	.filter(char => char.TvSeries.length)
	.filter(char => char.Name.length > 0)

// Loop through all the characters and determine if they have children
const getChildren = coll =>
	coll.reduce((acc, curr) => {
		const childrenArr = charsById.get(curr.Id).Children
		if (childrenArr.length) {
			const childrenName = childrenArr.map(
				childID => charsById.get(childID).Name
			)
			acc[curr.Name] = childrenName
		}
		return acc
	}, {})

// Loop through all the characters and determine if they have grandchildren
const getGrandChildren = coll =>
	coll.reduce((acc, curr) => {
		const childrenArr = charsById.get(curr.Id).Children
		if (childrenArr.length) {
			childrenArr.forEach(childrenID => {
				var grandchildrenArr = charsById.get(childrenID).Children
				if (grandchildrenArr.length) {
					const grandchildrenName = grandchildrenArr.map(
						grandChildID => charsById.get(grandChildID).Name
					)
					acc[curr.Name] = grandchildrenName
				}
			})
		}
		return acc
	}, {})

// return fathers Name
const renderFather = char => charsById.get(char.Father).Name
const getDad = char =>
	new Promise(resolve => {
		resolve(renderFather(char))
	})
// return mothers name
const renderMother = char => charsById.get(char.Mother).Name
const getMom = char =>
	new Promise(resolve => {
		resolve(renderMother(char))
	})
// return spouse
const renderSpouse = char => charsById.get(char)
const getSpouse = char =>
	new Promise(resolve => {
		resolve(renderSpouse(char))
	})

// return children
const renderChildren = char => {
	const childrenArr = char.Children
	return childrenArr.map(childId => charsById.get(childId).Name)
}
// return books
const renderBooks = char => {
	const booksArr = char.Books
	return booksArr.map(bookid => booksById.get(bookid).Name)
}

const getTvChars = () => new Promise(resolve => resolve(tvChars))

const getCharacters = () => new Promise(resolve => resolve(characters))

const getCharsById = id =>
	new Promise(resolve => {
		const parseId = parseInt(id)
		const [char] = characters.filter(char => char.Id === parseId)
		resolve(char)
	})

exports.getCharacters = getCharacters
exports.getTvChars = getTvChars
exports.characters2 = characters2
exports.getDad = getDad
exports.getMom = getMom
exports.renderSpouse = renderSpouse
exports.getSpouse = getSpouse
exports.getCharsById = getCharsById
