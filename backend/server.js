const cors = require('cors');
app.use(cors());

const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Girl Who Share API');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
