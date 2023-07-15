const express = require('express');
const app = express();
const port = 3000;
const products = [

]

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000)