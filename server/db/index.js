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
  await Places.create(allPlaces);
}

let loadPlaces = async (loc) => {
  let currentPlaces = await Places.find({ location: loc }).limit(12);
  return currentPlaces;
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
  await Todo.create(todos)
}

let loadTodos = async (loc) => {
  let currentTodos = await Todo.find({ location: loc }).limit(20);
  return currentTodos;
}


module.exports = {
  db,
  savePlaces,
  saveTodos,
  loadPlaces,
  loadTodos
}