import multer from "multer";

import mime from "mime";

import { randomUUID } from "node:crypto";

export const generatePhotoFilename = (mimeType: string) => {
    const fileExtension = mime.getExtension(mimeType);
    const fileName = `${randomUUID()}-${Date.now()}`;
    const finalName = `${fileName}.${fileExtension}`;

    return finalName;
};

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype));
    },
});

const MAX_FILE_SIZE_IN_MEGABYTES = 6 * 1024 ** 2;

const VALID_FILES_TYPES = ["image/png", "image/jpeg"];

const fileFilter: multer.Options["fileFilter"] = (request, file, callback) => {
    if (VALID_FILES_TYPES.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(
            new Error(
                "Error: uploaded file must be a .png, .jpg or .jpeg image"
            )
        );
    }
};

export const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE_IN_MEGABYTES,
    },
};

export const initMulterMiddleware = () => {
    return multer({ storage, ...multerOptions });
};
