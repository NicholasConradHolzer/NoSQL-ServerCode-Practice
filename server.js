const express = require('express');
// const mongoose = require('mongoose');
// const compression = require("compression");
const mongo = require ('./config/mongo')
const route = require('./routes')
const PORT = process.env.PORT || 3001;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thoughtDB'
const app = express();
// app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.use(route);
// Use this to log mongo queries being executed!
// const ion =
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.set('debug', true);
// if (ion) {
//   app.listen(PORT, () =>
//     console.log(`Server listening at http://localhost:${PORT}`)
//   );
// } else {
//   console.log('Connection to the database failed.');
// }

mongo.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
// app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));