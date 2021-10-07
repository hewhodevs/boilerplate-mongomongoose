require('dotenv').config();
let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

// Connect to your mongoDB cluster on mongoDB Atlas using your personal secret URI link
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = model('Person', personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person({
    name: "Joe Dirt",
    age: "42",
    favoriteFoods: ["Pizza", "Pie", "Pinapple"]
  });
  // Save newPerson document and handle any errors that occur when trying to do so
  newPerson.save(function(err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

// Placeholder test data for createManyPeople method
let arrayOfPeople = [
  {name: "Joe Dirt", age: "42", favoriteFoods: ["Pizza", "Pie", "Pinapple"]},
  {name: "Mary Wallst", age: "46", favoriteFoods: ["Apple", "Lemon", "Cake"]},
  {name: "Eliza Nade", age: "33", favoriteFoods: ["Chocolate", "Cookies", "Coffee"]},
];

// uses the Model.create method, pass array of values to create in that model
// handle any error as well in the callback function.
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};


// Finds any person object that matches the provided name
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  });
};

// returns a single matching document from the database.
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  })
};


// finds the document object matching the ID provided.
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  });
};


// Find the person document matching the ID,
// add a food to their favoriteFood array,
// then save the change to that person
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // find the person matching the ID
  Person.findById(personId, function(err, result) {
    if (err) return console.log(err);
    // Push the new food into their food array
    result.favoriteFoods.push(foodToAdd);
    // save the result of the updated person
    result.save(function(err, data) {
      if(err) return console.log(err);
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
