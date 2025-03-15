import express from 'express';
import fs from 'fs';

const router = express.Router();

const path = './data/tags.json';

const readData = () => {
  const tagData = fs.readFileSync(path);
  return JSON.parse(tagData);
};

router.get('/', (req, res) => {
  const tags = readData();
  res.status(200).json(tags);
});
export default router;
