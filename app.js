import 'dotenv/config'
import express from "express";
import cors from "cors";
import axios from "axios";

// import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/user", userRoutes);
app.use("/post", postRoutes)

// app.get("/", (req, res) => {
//     res.send("HI");
// });

// axios.post('http://localhost:3030/post', {
//     url: "https://twitter.com/TheRock/status/1489222081745080320"
//   })
//   .then(function (response) {
//     // console.log(response);
//   })
//   .catch(function (error) {
//     // console.log(error);
//   });

app.listen(3030, () => {
    console.log("starting server on 3030");
});
