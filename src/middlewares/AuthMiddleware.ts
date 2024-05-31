import { BaseMiddleware } from 'inversify-express-utils';
import { NextFunction, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ResponseError } from '../handlers/response-error';
import { Principal } from '../common/security/Principal';
import { errorResponse } from '../dtos/response/error-response';
import { AuthService } from '../services/AuthService';
import TYPES from '../di/types';
import { UserRequest } from '../dtos/request/user-request';

const authService = inject(TYPES.AuthService);

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  @authService private readonly _authService: AuthService | undefined;

  public async handler(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new ResponseError(401, 'Token not found');
      }
      const user = await this._authService?.getUser(token);
      if (!user) {
        throw new ResponseError(401, 'Unauthorized');
      }
      this.httpContext.user = new Principal(user);
      req.user = user;
    } catch (error) {
      return errorResponse({ error: error as Error, res });
    }

    next();
  }
}
