import express from "express";
import dotenv from "dotenv";

/* import {
  verify,
  handleCheckRole,
} from "./middleware/index.js"; */
import authRouter from "./api/auth/auth.js";
import projectRouter from "./api/project/project.js"
import { handleSendMail } from "./utils/handle.js";
const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();
app.use(express.json());
//config cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});


app.post('/email/send', (req, res) => {
  const data = req.body
  handleSendMail(res,{toMail:data.email,subject:data.subject,content:data.content})
})


app.get('/send/mail',(req,res) => {})
// Test
app.get("/", (req, res) => {
  res.json("Hello.");
});
app.use('/auth',authRouter)
app.use('/api/project',projectRouter)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});