import express from "express";
import "express-async-errors";

import prisma from "./lib/prisma/client";

import {
    validate,
    planetSchema,
    PlanetType,
    validationErrorMiddleware,
} from "./lib/validation";

const app = express();

app.use(express.json());

app.get("/planets", async (request, response) => {
    const planets = await prisma.planets.findMany();

    response.json(planets);
});

app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const planet: PlanetType = request.body;
        response.status(201).json(planet);
    }
);

app.use(validationErrorMiddleware);

export default app;
