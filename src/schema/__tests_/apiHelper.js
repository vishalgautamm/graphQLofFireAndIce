const { expect } = require('chai')
const { describe, it } = require('mocha')

const booksJSON = require('../../data/books.json')
const characterJSON = require('../../data/character.json')
const houseJSON = require('../../data/houses.json')

const {
	getData,
	getDataById,
	getDataListById,
	addGender,
	findByName
} = require('../apiHelper')

describe('API Helper', function() {
	it('Gets the length of the data', async () => {
		const bookAPI = await getData(booksJSON)
		expect(bookAPI.length).to.equal(12)

		const characterAPI = await getData(characterJSON)
		expect(characterAPI.length).to.equal(2134)

		const houseAPI = await getData(houseJSON)
		expect(houseAPI.length).to.equal(444)
	})

	it('Gets the title of a book', async () => {
		const bookOne = await getDataById(booksJSON, 1)
		expect(bookOne.Name).to.equal('A Game of Thrones')

		const bookFive = await getDataById(booksJSON, 5)
		expect(bookFive.Name).to.equal('A Feast for Crows')
	})

	it('Gets the gender of a character', async () => {
		const sansa = await getDataById(addGender(characterJSON), 957)
		expect(sansa.gender).to.equal('Female')

		const tyrion = await getDataById(addGender(characterJSON), 1052)
		expect(tyrion.gender).to.equal('Male')
	})

	it('Gets tne name of a character and total number of children', async () => {
		const daenerys = await findByName(characterJSON, 'Daenerys')
		expect(daenerys.Name).to.equal('Daenerys Targaryen')
		expect(daenerys.Children.length).to.equal(0)

		const jaime = await findByName(characterJSON, 'Jaime L')
		expect(jaime.Name).to.equal('Jaime Lannister')
		expect(jaime.Children.length).to.equal(3)
	})

	it('Gets the total number of books, the character was feaured in and name of one of the books', async () => {
		const robStark = await getDataById(characterJSON, 1880)
		const robBooks = await getDataListById(booksJSON, robStark.Books)
		expect(robBooks.length).to.equal(5)

		const arya = await getDataById(characterJSON, 148)
		const aryaBooks = await getDataListById(booksJSON, arya.PovBooks)
		expect(aryaBooks.length).to.equal(5)
	})
})
