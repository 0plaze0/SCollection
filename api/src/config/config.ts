import "dotenv/config";

interface ENV {
  MONGO_URI: string | undefined;
  SALT_ROUND: string | undefined;
  ACCESS_TOKEN: string | undefined;
}

interface Config {
  MONGO_URI: string;
  SALT_ROUND: string;
  ACCESS_TOKEN: string;
}

const getConfig = (): ENV => ({
  MONGO_URI: process.env.MONGO_URI,
  SALT_ROUND: process.env.SALT_ROUND,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
});

const getSatinizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }

  return config as Config;
};

const config = getConfig();

const satinizedConfig = getSatinizedConfig(config);

export default satinizedConfig;
