const missing = "Warning: no value set for this env variable";

const config = {
    PORT: process.env.PORT || missing,
    SESSION_SECRET: process.env.SESSION_SECRET || missing,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || missing,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || missing,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || missing,
};

export default config;
