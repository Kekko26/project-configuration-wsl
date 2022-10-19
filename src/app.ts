import express from "express";
import "express-async-errors";

import cors from "cors";

import { validationErrorMiddleware } from "./lib/validation";

import planetsRoute from "./routes/planets";
import planetsIdRoute from "./routes/planets-id";
import planetsIdPhotoRoute from "./routes/planets-id-photo";

const app = express();

const corsOptions = {
    origin: "http://localhost:8080",
};

app.use(express.json());

app.use(cors(corsOptions));

app.use(planetsRoute);

app.use(planetsIdRoute);

app.use(planetsIdPhotoRoute);

//this gives access to uploads folder through /planets/photo route (es. /planets/photo/imagefilename.jpg)
app.use("/planets/photo", express.static("uploads/"));

app.use(validationErrorMiddleware);

export default app;
