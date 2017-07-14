//mongoosejs.com을 항상 참조할것
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '57bf38394b39c93d2a557e981';

if (!ObjectID.isValid(id)) { //if(objectid is NOT valid)
  console.log('ID not valid');
}

Todo.find({
  _id: id //string으로 넣어도 몽구스가 아라서 objectId로 바꿔줌
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({//find랑 유사 다른점은 return one document at most 찾는 조건에 해당되는게 많아도 첫번째로 찾아진 하나만 return함
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id).then((todo) => { //그냥 아이디 input하면 알아서 찾아줌
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e) => console.log(e));

User.findById('57bdb0fcdedf88540bfa2d66').then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
