import { Response, NextFunction } from 'express';
import { ResponseError } from '../handlers/response-error';
import { errorResponse } from '../dtos/response/error-response';
import { UserRequest } from '../dtos/request/user-request';

export function checkRoleMiddleware(requiredRoles: Array<string>) {
  return async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role as string;
      if (!requiredRoles.includes(userRole)) {
        throw new ResponseError(403, 'Forbidden');
      }
    } catch (error) {
      return errorResponse({ error: error as Error, res });
    }

    next();
  };
}
