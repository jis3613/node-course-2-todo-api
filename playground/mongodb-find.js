// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

//object destructuring
// var user = {name: 'tommy', age:25};
// var {name} = user;
// console.log(name);



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    console.log('Unable to connect to MongoDB server');

  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5911030e7092095ecb2138af')
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch dotos',err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch dotos',err);
  // });
  db.collection('Users').find({name: 'Tommy'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs,undefined,2));
  }, (err) => {
    console.log('Unable to fetch dotos',err);
  });
  // db.close();
});
