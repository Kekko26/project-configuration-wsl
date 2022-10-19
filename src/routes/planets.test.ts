import supertest from "supertest";

import app from "../app";

import { prismaMock } from "../lib/prisma/client.mock";

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
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

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
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

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
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const response = await request
            .put("/planets/1")
            .send({
                description: "Gaia",
                diameter: 1000,
            })
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
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

describe("DELETE /planets/:id", () => {
    test("Valid request", async () => {
        const response = await request
            .delete("/planets/1")
            .expect(204)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.text).toContain("");
    });

    test("Not found id request", async () => {
        //@ts-ignore
        prismaMock.planets.delete.mockRejectedValue(new Error("ID NOT FOUND"));

        const response = await request
            .delete("/planets/44")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(`Cannot DELETE /planets/44`);
    });

    test("Not-an-id request", async () => {
        const response = await request
            .delete("/planets/peppe")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(`Cannot DELETE /planets/peppe`);
    });
});

describe("POST /planets/:id/photo", () => {
    // this first test uses multer.mock.ts to avoid saving tests images on disk everytime a test is done
    test("Valid test with uploaded png photo", async () => {
        await request
            .post("/planets/3/photo")
            .attach("photo", "test-fixtures/photos/planet.png")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    });

    test("Valid test with uploaded jpg photo", async () => {
        await request
            .post("/planets/3/photo")
            .attach("photo", "test-fixtures/photos/mountain.jpg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    });

    test("Invalid test with not an image uploaded", async () => {
        const response = await request
            .post("/planets/3/photo")
            .attach("photo", "test-fixtures/photos/text.txt")
            .expect(500)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(
            "Error: uploaded file must be a .png, .jpg or .jpeg image"
        );
    });

    test("Id not found request", async () => {
        // @ts-ignore
        prismaMock.planets.update.mockRejectedValue(new Error("Error"));

        const response = await request
            .post("/planets/59/photo")
            .attach("photo", "test-fixtures/photos/planet.png")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot POST /planets/59/photo");
    });

    test("Not-an-id request", async () => {
        const response = await request
            .post("/planets/eueueu/photo")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(`Cannot POST /planets/eueueu/photo`);
    });

    test("Invalid request with no upload", async () => {
        const response = await request
            .post("/planets/3/photo")
            .expect(400)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain(`No photo uploaded`);
    });
});
