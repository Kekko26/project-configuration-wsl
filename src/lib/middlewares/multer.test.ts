import { generatePhotoFilename } from "./multer";

describe("Filename generator for photos", () => {
    test.each([
        ["image/png", "png"],
        ["image/jpeg", "jpeg"],
    ])("Generate a file extension for '%s'", (mimeType, fileExtension) => {
        const fullName = generatePhotoFilename(mimeType);
        const [, ext] = fullName.split(".");

        expect(ext).toEqual(fileExtension);
    });
});
