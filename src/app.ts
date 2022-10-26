import express from "express";
import "express-async-errors";

import "dotenv/config";

import { validationErrorMiddleware } from "./lib/middlewares/validation";

import planetsRoute from "./routes/planets";

import { initCorsMiddleware } from "./lib/middlewares/cors";

import { initSessionMiddleware } from "./lib/middlewares/session";
import { passport } from "./lib/middlewares/passport";

import authRoute from "./routes/auth";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoute);
app.use("/auth", authRoute);

app.use(validationErrorMiddleware);

export default app;
