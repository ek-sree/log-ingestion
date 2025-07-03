import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  CORS_KEY: process.env.CORS_KEY,
};

export default config;
