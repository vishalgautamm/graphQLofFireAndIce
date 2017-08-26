const books = require('../data/books.json')
const characters = require('../data/character.json')
const houses = require('../data/houses.json')

const { booksById, charsById, housesById } = require('./util.js')

const sevenKingdoms = houses.filter(house => {
	return (
		house.Id === 362 ||
		house.Id === 395 ||
		house.Id === 7 ||
		house.Id === 229 ||
		house.Id === 17 ||
		house.Id === 398 ||
		house.Id === 285
	)
})

const getHouses = () => new Promise(resolve => resolve(houses))

const getHouseById = id =>
	new Promise(resolve => {
		const parseId = parseInt(id)
		const [house] = houses.filter(house => house.Id === parseId)
		resolve(house)
	})

const getSevenKingdoms = () => new Promise(resolve => resolve(sevenKingdoms))

exports.getHouses = getHouses
exports.getHouseById = getHouseById
exports.getSevenKingdoms = getSevenKingdoms
