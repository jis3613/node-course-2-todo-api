const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} =require('./../server/models/user');

// Todo.remove({}).then((result)=> {
//   console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove() //이 둘은 하는 일은 똑같으나 단직 id로 가져올것이냐 object라 갖고 올것이냐의 차이
Todo.findOneAndRemove({_id: '59151013a7762639507f7f30'}).then((todo) => {
  console.log(todo)
});

Todo.findByIdAndRemove('59151013a7762639507f7f30').then((todo) => {
  console.log(todo);
});
