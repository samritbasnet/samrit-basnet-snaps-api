import express from 'express';
import fs from 'fs';

const router = express.Router();
const path = './data/tags.json';

const readData = () => {
  try {
    const tagsData = fs.readFileSync(path);
    return JSON.parse(tagsData);
  } catch (error) {
    console.error('Error reading tags.json:', error);
    return [];
  }
};

router.get('/', (req, res) => {
  const tags = readData();
  if (tags.length === 0) {
    return res.status(404).json({ message: 'No tags found' });
  }
  res.status(200).json(tags);
});

export default router;
