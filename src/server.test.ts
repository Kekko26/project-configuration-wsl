import supertest from "supertest";

import app from "./app";

import { prismaMock } from "../src/lib/prisma/client.mock";

const request = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                id: 1,
                name: "Terra",
                description: "Gaia",
                diameter: 6000,
                createdAt: "2022-10-15T15:01:36.356Z",
                updatedAt: "2022-10-15T15:01:21.443Z",
            },
            {
                id: 3,
                name: "Mercurio",
                description: null,
                diameter: 3300,
                createdAt: "2022-10-15T15:02:18.231Z",
                updatedAt: "2022-10-15T15:02:06.317Z",
            },
        ];

        //@ts-ignore
        prismaMock.planets.findMany.mockResolvedValue(planets);

        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planets);
    });
});

describe("GET /planets/:id", () => {
    test("Valid request", async () => {
        const planets = {
            id: 1,
            name: "Terra",
            description: "Gaia",
            diameter: 6000,
            createdAt: "2022-10-15T15:01:36.356Z",
            updatedAt: "2022-10-15T15:01:21.443Z",
        };

        //@ts-ignore
        prismaMock.planets.findUnique.mockResolvedValue(planets);

        const response = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planets);
    });

    test("Not found id request", async () => {
        //@ts-ignore
        prismaMock.planets.findUnique.mockResolvedValue(null);

        const response = await request
            .get("/planets/44")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(`Cannot GET /planets/44`);
    });

    test("Not-an-id request", async () => {
        const response = await request
            .get("/planets/peppe")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(`Cannot GET /planets/peppe`);
    });
});

describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            id: 10,
            name: "Pushed Planet",
            description: null,
            diameter: 6000,
            createdAt: "2022-10-15T15:01:36.356Z",
            updatedAt: "2022-10-15T15:01:21.443Z",
        };

        //@ts-ignore
        prismaMock.planets.create.mockResolvedValue(planet);

        const response = await request
            .post("/planets")
            .send({
                name: "Pushed Planet",
                diameter: 6000,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 50000,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});

describe("PUT /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 1,
            name: "Terra",
            description: "Gaia",
            diameter: 1000,
            createdAt: "2022-10-15T15:01:36.356Z",
            updatedAt: "2022-10-15T15:01:21.443Z",
        };

        //@ts-ignore
        prismaMock.planets.update.mockResolvedValue(planet);

        const response = await request
            .put("/planets/1")
            .send({
                name: "Terra",
                description: "Gaia",
                diameter: 1000,
            })
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Not found id request", async () => {
        //@ts-ignore
        prismaMock.planets.update.mockRejectedValue(new Error("ID NOT FOUND"));

        const response = await request
            .put("/planets/44")
            .send({
                name: "Edited",
                diameter: 939,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(`Cannot PUT /planets/44`);
    });

    test("Not-an-id request", async () => {
        const response = await request
            .put("/planets/peppe")
            .send({
                name: "test edit",
                diameter: 2292992,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(`Cannot PUT /planets/peppe`);
    });
});
