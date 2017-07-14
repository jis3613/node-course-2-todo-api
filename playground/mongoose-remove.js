const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => { //모든걸 remove하고 싶으면 안에 그냥 빈 객체를 넣어야 한다. remove()이렇게 하면 안되고 remove({})이렇게 해야함
  console.log(result);
});

Todo.findOneAndRemove({_id: '57c4610dbb35fcbf6fda1154'}).then((todo) => {
//id가 아닌 다른걸로도 찾아서 지울 수 있음
});

Todo.findByIdAndRemove('57c4610dbb35fcbf6fda1154').then((todo) => {
  console.log(todo); //id로만 찾아서 지움
});
