const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const faker = require('faker');
const writePlaces = fs.createWriteStream('./places.csv');
writePlaces.write('location,description,picture,stars,reviews,price,beds\n', 'utf8');
const writeTodos = fs.createWriteStream('./todos.csv');
writeTodos.write('location,description,picture,stars,reviews,price\n', 'utf8')

function writeAllPlaces(writer, encoding, callback) {
  console.time('places');
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const location = faker.address.state();
      const description = faker.random.words(20);
      const picture = 'http://placeimg.com/200/200/arch';
      const stars = faker.random.number({ min: 1, max: 5 });
      const reviews = faker.random.number({ min: 20, max: 180 });
      const price = faker.random.number({ min: 30, max: 400 });
      const beds = faker.random.number({ min: 1, max: 10 });
      const data = `${location},${description},${picture},${stars},${reviews},${price},${beds}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
}

function writeAllTodos(writer, encoding, callback) {
  console.time('todos')
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const location = faker.address.state();
      const description = faker.random.words(20);
      const picture = 'http://placeimg.com/200/200/nature';
      const stars = faker.random.number({ min: 1, max: 5 });
      const reviews = faker.random.number({ min: 20, max: 100 });
      const price = faker.random.number({ min: 30, max: 120 });
      const data = `${location},${description},${picture},${stars},${reviews},${price}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
}


let timer = async () => {
  writeAllPlaces(writePlaces, 'utf-8', () => {
    console.timeEnd('places');
    writePlaces.end();
  });
  writeAllTodos(writeTodos, 'utf-8', () => {
    console.timeEnd('todos');
    writeTodos.end();
  })
}

timer();













