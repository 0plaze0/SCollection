import "dotenv/config";

interface ENV {
  MONGO_URI: string | undefined;
}

interface Config {
  MONGO_URI: string;
}

const getConfig = (): ENV => ({
  MONGO_URI: process.env.MONGO_URI,
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
