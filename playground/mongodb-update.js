// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    console.log('Unable to connect to MongoDB server');

  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59123e1ba7762639507e7ba9')
  // },{
  //   $set: {
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: 123
  },{
    $set: {
      name: 'Tom'
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
