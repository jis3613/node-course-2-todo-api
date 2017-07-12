// const MongoClient = require('mongodb').MongoClient; //MongoClient let you connect to a Mongo server issue command to manipulate the database
const {MongoClient, ObjectID} = require('mongodb'); //this code is identical to the code up above.
//Object destructuring let you pull out property from an object creating variable
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {  //url where database lives
  if (err) {
    return console.log('Unable to connect to MongoDB server');//return prevents rest of the code to work when err occurs
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }
     //success code
    console.log(JSON.stringify(result.ops, undefined, 2)); //result.ops store all of the values that were inserted / undefined: filter function 2:indentation
  });

  //Insert new doc into Users (name, age, location)
  db.collection('Users').insertOne({
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(result.ops[0]._id.getTimestamp()); //첫번째 document의 id
  });

  db.close(); //close the connection withe the mongo db server.
});
