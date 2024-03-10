const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // assuming your HTML files are located in a folder named 'public'

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});