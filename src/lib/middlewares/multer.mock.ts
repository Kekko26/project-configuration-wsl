import multer from "multer";

jest.mock("./multer", () => {
    const originalModule = jest.requireActual("./multer");

    return {
        __esmodule: true,
        ...originalModule,
        initMulterMiddleware: () => {
            return multer({
                storage: multer.memoryStorage(),
                ...originalModule.multerOptions,
            });
        },
    };
});
