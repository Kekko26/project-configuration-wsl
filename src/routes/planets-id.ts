import prisma from "../lib/prisma/client";
import express from "express";
import { planetSchema, PlanetType, validate } from "../lib/validation";

const router = express.Router();

router.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);

    const planet = await prisma.planets.findUnique({
        where: { id: planetId },
    });

    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }

    response.json(planet);
});

router.put(
    "/planets/:id(\\d+)",
    validate({ body: planetSchema }),
    async (request, response, next) => {
        const planetData: PlanetType = request.body;
        const planetId = Number(request.params.id);

        try {
            const planet = await prisma.planets.update({
                where: { id: planetId },
                data: planetData,
            });

            response.json(planet);
        } catch (e) {
            response.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);

router.delete("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);

    try {
        await prisma.planets.delete({
            where: { id: planetId },
        });

        response.status(204).end();
    } catch (e) {
        response.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});

export default router;
