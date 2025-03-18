import express from 'express';
import photosRouter from './routes/photo.js';
import tagsRouter from './routes/tags.js';
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use('/photos', express.static('public/photos'));
app.get('/', (req, res) => {
  res.send('Succesfull connection');
});
app.use('/tags', tagsRouter);
app.use('/photos', photosRouter);

app.listen(PORT, function () {
  console.log(`Server is listening on PORT ${PORT}`);
});
