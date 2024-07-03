import { Request, Response, NextFunction } from "express-serve-static-core";
import { z, ZodError } from "zod";

export const dataValidation = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const errorMsg = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(400).json({ success: false, message: errorMsg });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal server Error" });
      }
    }
  };
};
