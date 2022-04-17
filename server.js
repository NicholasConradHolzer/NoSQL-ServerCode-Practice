const express = require('express');
const mongo = require ('./config/mongo')
const route = require('./routes')
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(route);
mongo.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
// app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));