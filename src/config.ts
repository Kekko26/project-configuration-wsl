const missing = "Warning: no value set for this env variable";

const config = {
    PORT: process.env.PORT || missing,
};

export default config;
