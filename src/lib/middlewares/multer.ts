import multer from "multer";

const multerOptions = {};

export const initMulterMiddleware = () => {
    return multer(multerOptions);
};
