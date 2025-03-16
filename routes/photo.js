import { timeStamp } from 'console';
import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const path = './data/photos.json';

const readData = () => {
  const photosData = fs.readFileSync(path);
  return JSON.parse(photosData);
};

router.get('/', (req, res) => {
  const photos = readData();
  res.status(200).json(photos);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const photos = readData();
  const photo = photos.find((p) => p.id === id);
  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404).send('Photo not found');
  }
});

router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  const photos = readData();
  const photo = photos.find((p) => p.id === id);
  if (!photo) {
    return res.status(404).send('Photo not found');
  }
  res.status(200).json(photo.comments);
});

router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: 'Text and author required' });
  }
  const photos = readData();
  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    return res.status(404).send('Photo not found');
  }
  const newComment = {
    id: uuidv4(),
    name: author,
    comment: text,
    timestamp: Date.now(),
  };
  photo.comments.push(newComment);
  fs.writeFileSync(path, JSON.stringify(photos, null, 2));
  res.status(201).json(newComment);
});
export default router;
