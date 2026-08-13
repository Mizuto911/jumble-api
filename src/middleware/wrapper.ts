import { type Response, type Request } from "express";

export const catchError = (
  callback: (
    req: Request,
    res: Response,
  ) => Promise<unknown> | Response<any, Record<string, any>>,
) => {
  return async (req: Request, res: Response) => {
    try {
      await callback(req, res);
    } catch (e) {
      res.status(400).json({
        success: false,
        msg: e instanceof Error ? e.message : "Something went wrong.",
      });
    }
  };
};
