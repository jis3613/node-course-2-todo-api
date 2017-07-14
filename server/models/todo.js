var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true, //value must exist
    minlength: 1,
    trim: true//eliminate any white space
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var newTodo =  new Todo({
//   text: 'Cook dinner'
// });

////save()를 해야지 진짜 mongodb database에 저장됨
// newTodo.save().then((doc)=>{
//   consolelog('Saved todo',doc);
// }, (e)=>{
//   console.log('Unable to save todo')
// });

// var otehrTodo = new Todo({
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: 123 //기준은 1970년 1월1일이고 숫자는 '초'이다.
// });

// otherTodo.save().then((doc)=>{
//   console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//   console.log('Unable to save',e);
// });

module.exports = {Todo};
