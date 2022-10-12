import express from "express";
import "express-async-errors";

const app = express();

app.get("/", (request, response) => {
    response.send("Aweome!");
});

const port = 3000;

app.listen(port, () => {
    console.log(`[server]: Running on port: ${port}`);
});
