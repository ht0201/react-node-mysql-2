const express = require('express');
const cors = require('cors');

const app = express();

const db = require('./models');
app.use(express.json());
app.use(cors());

//Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
  app.listen(7000, () => {
    console.log('Server running on port 7000');
  });
});
