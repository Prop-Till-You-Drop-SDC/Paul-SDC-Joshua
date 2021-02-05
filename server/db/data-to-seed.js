// const ObjectsToCsv = require('objects-to-csv');
const faker = require('faker');
const db = require('./index.js');

let seed = async (number) => {
  let start = process.hrtime();
  let generatePlaces = async function(num, cb) {
    let allPlaces = [];
    for (let i = 0; i < num; i++) {
      let newObj = {
        location: faker.address.state(),
        description: faker.random.words(20),
        picture: "http://placeimg.com/200/200/arch",
        stars: faker.random.number({min: 1, max: 5}),
        reviews: faker.random.number({min: 20, max: 180}),
        price: faker.random.number({min: 30, max: 400}),
        beds: faker.random.number({min: 1, max: 10})
      }
      allPlaces.push(newObj);
      if (allPlaces.length >= 1000) {
        await cb(allPlaces);
        // const csv = new ObjectsToCsv(allPlaces);
        // await csv.toDisk('/Users/paulvanleuven/Documents/Code/SDC/Paul-SDC-Joshua/server/db/places.csv');
        allPlaces = [];
      }

    }
   }
   await generatePlaces(number, async (data) => {
     await db.savePlaces(data)
  });

  let generateTodos = async function(num, cb) {
    let allTodos = [];
    for (let i = 0; i < num; i++) {
      let newObj = {
        location: faker.address.state(),
        description: faker.random.words(20),
        picture: "http://placeimg.com/200/200/nature",
        stars: faker.random.number({min: 1, max: 5}),
        reviews: faker.random.number({min: 20, max: 180}),
        price: faker.random.number({min: 10, max: 100})
      }
      allTodos.push(newObj);
      if (allTodos.length >= 1000) {
        await cb(allTodos)
        // const csv = new ObjectsToCsv(allPlaces);
        // await csv.toDisk('/Users/paulvanleuven/Documents/Code/SDC/Paul-SDC-Joshua/server/db/todos.csv');
        allTodos = [];
      }
    }
  }
  await generateTodos(number, async (data) => {
    await db.saveTodos(data)
  })
  let end = process.hrtime(start);
  console.log(end);
  console.log('completed in: ' + end[1] / 1000000);
}

let timer = async (num) => {
  let begin = process.hrtime();
  await seed(num)
  let stop = process.hrtime(begin);
  console.log('end ' + stop[1] / 1000000)
}

timer(1000);












