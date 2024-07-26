import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.use(express.json());

app.listen(process.env.PORT||4000,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})
