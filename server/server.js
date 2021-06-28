const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json()); //testing

const apiRouter = require('./routes/api');

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
})


app.use('/api', apiRouter);

app.use((req, res) => res.sendStatus(404))

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
})

app.listen(PORT, () => {
  console.log('Server Listening on port 3000');
});
