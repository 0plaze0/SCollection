import express from "express";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  return res.status(200).send({ message: "hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
