const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

//const apiRouter = require('./routes/api');

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
})


//app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('Server Listening on port 3000');
});
