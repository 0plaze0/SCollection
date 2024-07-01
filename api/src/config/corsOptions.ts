export interface CorsOptions {
  credentials: boolean;
  origin: CustomOrigin | undefined; // Use the CustomOrigin type
}

type CustomOrigin = (
  origin: string, // Only string argument allowed here
  callback: (err?: Error | null, options?: boolean) => void
) => void;

const whiteList: string[] = ["http://localhost:5173"];

const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin: string, callback) => {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else callback(new Error("Not Allowed"));
  },
};

export default corsOptions;
