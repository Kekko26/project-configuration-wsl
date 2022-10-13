import supertest from "supertest";

import app from "./app";

const request = supertest(app);

test("get /", async () => {
    const response = await request
        .get("/")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.text).toBe(
        JSON.stringify([
            {
                name: "George",
                age: 38,
            },
            {
                name: "Scott",
                age: 32,
            },
        ])
    );
});
