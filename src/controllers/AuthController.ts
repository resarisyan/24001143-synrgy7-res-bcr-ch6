import { httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import {
  controller,
  request,
  response,
  BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../di/types.js';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserRequest
} from '../dtos/request/user-request.js';
import {
  successResponse,
  successResultResponse
} from '../dtos/response/success-response.js';
import { errorResponse } from '../dtos/response/error-response.js';
import { AuthService } from '../services/AuthService.js';
import { EnumRoleUser } from '../enums/role-user-enum.js';

@controller('/auth')
export class AuthController extends BaseHttpController {
  private authService: AuthService;
  constructor(@inject(TYPES.AuthService) authService: AuthService) {
    super();
    this.authService = authService;
  }

  @httpPost('/login')
  public async login(@request() req: Request, @response() res: Response) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await this.authService.login(request);
      successResultResponse({
        res,
        data: response,
        message: 'Login success',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpPost('/logout', TYPES.AuthMiddleware)
  public async logout(@request() req: UserRequest, @response() res: Response) {
    try {
      const token = this.httpContext.user.details.token;
      await this.authService.logout(token);
      successResponse({
        res,
        message: 'Logout success',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpPost('/register')
  public async register(@request() req: Request, @response() res: Response) {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      request.role = EnumRoleUser.MEMBER;
      const response = await this.authService.register(request);
      successResultResponse({
        res,
        data: response,
        message: 'Register success',
        status: 201
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpGet('/me', TYPES.AuthMiddleware)
  public async me(@request() req: UserRequest, @response() res: Response) {
    try {
      const response = await this.authService.me(req);
      successResultResponse({
        res,
        data: response,
        message: 'Get user success',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }
}
