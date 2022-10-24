const missing = "Warning: no value set for this env variable";

const config = {
    PORT: process.env.PORT || missing,
    SESSION_SECRET: process.env.SESSION_SECRET || missing,
};

export default config;
