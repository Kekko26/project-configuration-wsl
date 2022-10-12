import express from "express";
import "express-async-errors";

const app = express();

app.get("/", (request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.json([
        {
            name: "George",
            age: 38,
        },
        {
            name: "Scott",
            age: 32,
        },
    ]);
});

export default app;
