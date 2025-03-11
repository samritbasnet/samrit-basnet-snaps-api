import express from 'express';
const app = express();

const PORT = process.env.PORT || 8081;
app.listen(8080, function () {
  console.log('listening to port: 8080', PORT);
});
