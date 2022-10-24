import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middlewares/validation";

import planetsRoute from "./routes/planets";

import { initCorsMiddleware } from "./lib/middlewares/cors";

import { initSessionMiddleware } from "./lib/middlewares/session";
import { passport } from "./lib/middlewares/passport";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoute);

app.use(validationErrorMiddleware);

export default app;
