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

app.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);

    const planet = await prisma.planets.findUnique({
        where: { id: planetId },
    });

    if (!planet) {
        response.status(404);
        return next(`Cannot GET planets/${planetId}`);
    }

    response.json(planet);
});

app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const planetData: PlanetType = request.body;

        const planet = await prisma.planets.create({
            data: planetData,
        });

        response.status(201).json(planet);
    }
);

app.use(validationErrorMiddleware);

export default app;
