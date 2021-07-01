const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = 3000;

app.use(express.json());
app.use(cookieParser()); //testing

const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');
const sessionController = require('./controllers/sessionController');

const MONGO_URL =
  'mongodb+srv://Kadenj117:kaden@catsnake.ekmt2.mongodb.net/IterationProject?retryWrites=true&w=majority'; //--username armadillos

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: 'IterationProject',
  })
  .then(() => console.log('connected to Mongo DB'))
  .catch((err) => console.log(err));

app.get('/dashboard', sessionController.isLoggedIn, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/signup', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.use('/api', apiRouter);
app.use('/user', userRouter);

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('Error: ', errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log('Server Listening on port 3000');
});
