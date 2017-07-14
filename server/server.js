require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');//let us send json to the server, server can take that json and do something with it.
//bodyParser essentially parses body
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

//use는 middleware 이용할떄
app.use(bodyParser.json());//bodyParser.json() function이 미들웨어로 우리가 주고싶은 것

//POST는 CREATE에 해당
app.post('/todos', (req, res) => {
  var todo = new Todo({  //새 모델을 만들고 그것에 text값을 넣는것
    text: req.body.text
  });

  todo.save().then((doc) => { //그리고 그 모델을 데이터베이스에 저장하는 것
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);//https://httpstatuses.com/ <-여기 가면 httpstatus 다 나옴
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id; //req.params is an object that has key value pairs where key is url parameter like :id

  if (!ObjectID.isValid(id)) { //if objecid is NOT valid
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) { //if todo is not found
      return res.status(404).send();
    }
    res.send({todo}); //그냥 todo 대신 {todo}가 들어가는 이유: todo is attached as todo property using ES6 object definition which means that it is identical to {todo: todo}
    //나중에 테스트할때 오브젝트로 들어와야 테스트하기 더 쉽게 되어 있음 예를 들어 이런 부분에서 expect(res.body.todo.text).toBe(todos[0].text);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => { //patch는 업데이트를 뜻함
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
