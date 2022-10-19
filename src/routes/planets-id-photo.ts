import express from "express";
import prisma from "../lib/prisma/client";
import { initMulterMiddleware } from "../lib/middlewares/multer";

const upload = initMulterMiddleware();

const router = express.Router();

router.post(
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

export default router;
