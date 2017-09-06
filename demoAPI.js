// const {
// 	getData,
// 	getDataById,
// 	addGender,
// 	findByName
// } = require('./src/schema/apiHelper')

/* Return all the data */
const getData = type => new Promise(resolve => resolve(type))

/* Iteratres over Character data and adds a new property to it: gender */

const addGender = data =>
	data.map(char => {
		if (char.IsFemale === false) {
			char.gender = 'Male'
		} else {
			char.gender = 'Female'
		}
		return char
	})

// Takes a jsonObject and a string as an input and returns an object
const findByName = (typeJSON, name) =>
	new Promise(resolve => {
		const [result] = typeJSON.filter(data => data.Name.includes(name))
		resolve(result)
	})

// Iterates over the collection of ID's and returns the object
const getDataListById = (typeJSON, arr) =>
	arr.map(id => getDataById(typeJSON, id))

const characterJSON = addGender(require('./src/data/character.json'))

/* Accepts an id and returns the object */
// const getDataById = (typeJSON, id) =>
// 	new Promise(resolve => {
// 		const parseId = parseInt(id)
// 		const [result] = typeJSON.filter(type => type.Id === parseId)
// 		resolve(result)
// 	})

const getDataById2 = async (typeJSON, id) => {
	const parseId = parseInt(id)
	const result = await typeJSON.filter(type => type.Id === parseId)
	return Promise.resolve(result)
}

var x = getDataById2(characterJSON, '27')
	.then(data => console.log(data[0]))
	.catch(err => console.log(err, 'Some error occoured'))

// console.log(x)

// console.log(x[0])
