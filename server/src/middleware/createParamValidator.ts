import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

const createParamValidator = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (e) {
      if (isZodError(e)) {
        res.status(400).send(e.errors);
      } else {
        next(e);
      }
    }
  };
};

export default createParamValidator;
