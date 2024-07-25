import "dotenv/config";
import { ConfigError } from "../errors/configError";

interface ENV {
  MONGO_URI: string | undefined;
  SALT_ROUND: string | undefined;
  ACCESS_TOKEN: string | undefined;
  CLOUDINARY_CLOUD_NAME: string | undefined;
  CLOUDINARY_API_KEY: string | undefined;
  CLOUDINARY_API_SECRET: string | undefined;
}

interface Config {
  MONGO_URI: string;
  SALT_ROUND: string;
  ACCESS_TOKEN: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const getConfig = (): ENV => ({
  MONGO_URI: process.env.MONGO_URI,
  SALT_ROUND: process.env.SALT_ROUND,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

const getSatinizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new ConfigError(`Missing key ${key} in .env`);
    }
  }

  return config as Config;
};
let satinizedConfig: Config;

try {
  const config = getConfig();
  satinizedConfig = getSatinizedConfig(config);
} catch (error) {
  if (error instanceof ConfigError) {
    throw error; // Re-throw the ConfigError to be caught by the global error handler
  }
  // If it's not a ConfigError, wrap it in one
  throw new ConfigError(
    `Unexpected error in configuration: ${(error as Error).message}`
  );
}

export default satinizedConfig;
