require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/tester_router");

app.use(express.json());

app.use("/api/v1", userRouter);

//limit the body payload Preventing DOS Attacks
app.use(express.json({ limit: '10kb' })); // Body limit is 10

app.listen(process.env.APP_PORT, () => 
console.log('App is running on PORT: ', process.env.APP_PORT));