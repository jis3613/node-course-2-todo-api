var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//mongoose is maintainng this connection over time
//mongoose is going to be waiting for the connection before making query
//mongoose takes care of orther of things happening.

module.exports = {mongoose};
// module.exports = {       //ES6 Syntex에서 는 윗줄이랑 이거랑 같음
//   mongoose: mongoose
// };
