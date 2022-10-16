import { Static, Type } from "@sinclair/typebox";

export const planetSchema = Type.Object(
    {
        name: Type.String(),
        description: Type.Optional(Type.String()),
        diameter: Type.Integer(),
    },
    { additionalProperties: false }
);

export type PlanetType = Static<typeof planetSchema>;
