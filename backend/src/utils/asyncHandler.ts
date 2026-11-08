import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Express 4 não captura rejeições de handlers async.
 * Este wrapper encaminha qualquer erro para o errorHandler.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
