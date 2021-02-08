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


module.exports = {
  db,
  savePlaces,
  saveTodos
}