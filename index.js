import express from 'express';
import photosRouter from './routes/photo.js';
import tagsRouter from './routes/tag.js';
import cors from cors;
const app = express();

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Succesfull connection");
})
app.use("/tag",tagsRouter);
app.use("/photo",photosRouter);

app.listen(8080, function () {
  console.log(`Server is listening on PORT ${PORT}`);
});
