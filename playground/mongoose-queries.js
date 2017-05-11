const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} =require('./../server/models/user');

// var id = '59142519ec63110f0664ec78';

// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

//mongoosejs.com 항상 참조할것
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo',todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo by ID',todo);
// }).catch((e) => console.log(e))

User.findById('5913345ea0705f08630cc151').then((user) => {
  if (!user){
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user,undefined,2));
}, (e) => {
  console.log(e);
})
