import 'dotenv/config'
import express from "express";
import cors from "cors";
import axios from "axios";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import blockchainRoutes from "./routes/blockchain.js";

const PORT = process.env.PORT || 3030;
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/post", postRoutes)
app.use("/blockchain", blockchainRoutes)

app.listen(PORT, () => {
    console.log(`starting server on ${PORT}`);
});
