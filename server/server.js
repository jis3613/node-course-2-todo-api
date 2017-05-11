// var mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(() => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
  // console.log(req.body);
});

//create read update delete CRUD

app.get('/todos',(req,res) => {
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

//GET /todos/1234324
app.get('/todos/:id',(req,res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    //{todo}=={todo: todo}
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port,() => {
  console.log(`Starting on port ${port}`);
});

module.exports = {app};
// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });

// var newTodo = new Todo({
//   text: 'Cook dinner',
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo',doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

// var otherTodo =  new Todo({
//   text: '  Edit this video   '
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//   console.log('Unable to save',e);
// })



// var user = new User({
//   email: 'tommy@email.com   '
// });
//
// user.save().then((doc) => {
//   console.log('User saved',doc);
// }, (e) => {
//   console.log('Unale to save user',e)
// });
