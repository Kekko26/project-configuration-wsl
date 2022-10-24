import { ValidationError, Validator } from "express-json-validator-middleware";
import addFormats from "ajv-formats";

import { ErrorRequestHandler } from "express";

const validator = new Validator({
    coerceTypes: true,
});

addFormats(validator.ajv, ["date-time"]);

export const validate = validator.validate;

export const validationErrorMiddleware: ErrorRequestHandler = (
    error,
    request,
    response,
    next
) => {
    if (error instanceof ValidationError) {
        response.status(422).send({ errors: error.validationErrors });

        next();
    } else {
        next(error);
    }
};

export * from "./planets";
