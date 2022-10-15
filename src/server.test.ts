import supertest from "supertest";

import app from "./app";

import { prismaMock } from "../src/lib/prisma/client.mock";

const request = supertest(app);

test("GET /", async () => {
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
