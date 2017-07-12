// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('57bc4b15b3b6a3801d8c47a2')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false //returnOriginal은 update되기전 original상태의 데이터를 return하는 것. default값은 true이다. 그래서 여기서 false로 해놓은것
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('57abbcf4fd13a094e481cf2c')
  }, {
    $set: {
      name: 'Andrew'
    },        //set이나 inc 쓰는법은 documentation 잘 참조해볼것
              //사용할때는 항상 object형식으로 함
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
