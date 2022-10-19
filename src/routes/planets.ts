import prisma from "../lib/prisma/client";
import express from "express";
import { planetSchema, PlanetType, validate } from "../lib/validation";

const router = express.Router();

router.get("/planets", async (request, response) => {
    const planets = await prisma.planets.findMany();

    response.json(planets);
});

router.post(
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

export default router;
