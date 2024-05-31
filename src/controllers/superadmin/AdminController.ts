import { inject } from 'inversify';
import { AdminService } from '../../services/AdminService';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  httpPut,
  request,
  response
} from 'inversify-express-utils';
import TYPES from '../../di/types';
import { AuthService } from '../../services/AuthService';
import { EnumRoleUser } from '../../enums/role-user-enum';
import { PageRequest } from '../../dtos/request/page-request';
import { successResultResponse } from '../../dtos/response/success-response';
import { errorResponse } from '../../dtos/response/error-response';
import { Request, Response } from 'express';
import { checkRoleMiddleware } from '../../middlewares/CheckRoleMiddleware';
import { RegisterUserRequest } from '../../dtos/request/user-request';

@controller(
  '/admin',
  TYPES.AuthMiddleware,
  checkRoleMiddleware([EnumRoleUser.SUPERADMIN])
)
export class AdminController extends BaseHttpController {
  constructor(
    @inject(TYPES.AdminService) private adminService: AdminService,
    @inject(TYPES.AuthService) private userService: AuthService
  ) {
    super();
  }

  @httpGet('/')
  public async index(@request() req: Request, @response() res: Response) {
    try {
      const request = {
        page: Number(req.query.page) || 0,
        size: Number(req.query.size) || 10
      } as PageRequest;
      const response = await this.adminService.getAll(request);
      successResultResponse({
        res,
        data: response,
        message: 'Admins retrieved',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpGet('/:id')
  public async show(@request() req: Request, @response() res: Response) {
    try {
      const id = req.params.id as string;
      const response = await this.adminService.getById(id);
      successResultResponse({
        res,
        data: response,
        message: 'Admin found',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpPost('/')
  public async store(@request() req: Request, @response() res: Response) {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      request.role = EnumRoleUser.ADMIN;
      const response = await this.userService.register(request);
      successResultResponse({
        res,
        data: response,
        message: 'Admin created',
        status: 201
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpPut('/:id')
  public async update(@request() req: Request, @response() res: Response) {
    try {
      const id = req.params.id as string;
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response = await this.adminService.update(id, request);
      successResultResponse({
        res,
        data: response,
        message: 'Admin updated',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }
}
