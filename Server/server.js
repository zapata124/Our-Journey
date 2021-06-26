const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

const apiRouter = require('./routes/api');

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + '../clent/index.html'));
})


app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Server Listening on port 3000');
});
