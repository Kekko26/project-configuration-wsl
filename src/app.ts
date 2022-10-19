import express from "express";
import "express-async-errors";

import cors from "cors";

import prisma from "./lib/prisma/client";

import {
    validate,
    planetSchema,
    PlanetType,
    validationErrorMiddleware,
} from "./lib/validation";

import { initMulterMiddleware } from "./lib/middlewares/multer";

const upload = initMulterMiddleware();

const app = express();

const corsOptions = {
    origin: "http://localhost:8080",
};

app.use(express.json());

app.use(cors(corsOptions));

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
        return next(`Cannot GET /planets/${planetId}`);
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

app.put(
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

app.delete("/planets/:id(\\d+)", async (request, response, next) => {
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

app.post(
    "/planets/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {
        if (!request.file) {
            response.status(400);
            return next("No photo uploaded");
        }

        const photoFilename = request.file.filename;

        const planetId = Number(request.params.id);

        try {
            await prisma.planets.update({
                where: { id: planetId },
                data: { photoFilename },
            });

            response.status(201).json({ photoFilename });
        } catch (e) {
            response.status(404);
            next(`Cannot POST /planets/${planetId}/photo`);
        }
    }
);

//this gives access to uploads folder through /planets/photo route (es. /planets/photo/imagefilename.jpg)
app.use("/planets/photo", express.static("uploads/"));

app.use(validationErrorMiddleware);

export default app;
