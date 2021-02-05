const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/places', {useNewUrlParser: true, useUnifiedTopology: true, sslValidate: false });

const db = mongoose.connection;

let placeSchema = mongoose.Schema({
  location: String,
  description: String,
  picture: String,
  stars: Number,
  reviews: Number,
  price: Number,
  beds: Number,
})

let Places = mongoose.model('Places', placeSchema);

let savePlaces =  async (allPlaces) => {
  let hrstart = process.hrtime();
  await Places.create(allPlaces);
  let hrend = process.hrtime(hrstart);
  console.log('seeding places: ' + hrend[1] / 1000000);
}

let todoSchema = mongoose.Schema({
    location: String,
    description: String,
    pic: String,
    stars: Number,
    reviews: Number,
    price: Number,
})

let Todo = mongoose.model('Todo', todoSchema);

let saveTodos = async (todos) => {
  let hrstart = process.hrtime();
  await Todo.create(todos);
  let hrend = process.hrtime(hrstart);
  console.log('seeding todos: ' + hrend[1] / 1000000);
}


module.exports = {
  db,
  savePlaces,
  saveTodos
}