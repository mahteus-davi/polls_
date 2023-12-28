import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
