import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response
} from 'inversify-express-utils';
import { CarService } from '../services/CarService';
import { inject } from 'inversify';
import TYPES from '../di/types';
import { Request, Response } from 'express';
import {
  successResponse,
  successResultResponse
} from '../dtos/response/success-response';
import { errorResponse } from '../dtos/response/error-response';
import {
  CreateCarRequest,
  UpdateCarRequest
} from '../dtos/request/car-request';
import { checkRoleMiddleware } from '../middlewares/CheckRoleMiddleware';
import { EnumRoleUser } from '../enums/role-user-enum';
import { PageRequest } from '../dtos/request/page-request';
@controller('/car', TYPES.AuthMiddleware)
export class CarController extends BaseHttpController {
  constructor(@inject(TYPES.CarService) private carService: CarService) {
    super();
  }

  @httpGet('/')
  public async index(@request() req: Request, @response() res: Response) {
    try {
      const request = {
        page: Number(req.query.page) || 0,
        size: Number(req.query.size) || 10
      } as PageRequest;
      const role = this.httpContext.user.details.role;
      let response;
      if (role !== EnumRoleUser.MEMBER) {
        response = await this.carService.getAll(request);
      } else {
        response = await this.carService.getAllNotDeleted(request);
      }
      successResultResponse({
        res,
        data: response,
        message: 'Cars retrieved',
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
      const response = await this.carService.getById(id);
      successResultResponse({
        res,
        data: response,
        message: 'Car found',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpPost(
    '/',
    checkRoleMiddleware([EnumRoleUser.ADMIN, EnumRoleUser.SUPERADMIN])
  )
  public async store(@request() req: Request, @response() res: Response) {
    try {
      const request: CreateCarRequest = {
        ...req.body,
        created_by: this.httpContext.user.details.id
      };
      const response = await this.carService.create(request);
      successResultResponse({
        res,
        data: response,
        message: 'Car created',
        status: 201
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpPut(
    '/:id',
    checkRoleMiddleware([EnumRoleUser.ADMIN, EnumRoleUser.SUPERADMIN])
  )
  public async update(@request() req: Request, @response() res: Response) {
    try {
      const request: UpdateCarRequest = {
        ...req.body,
        updated_by: this.httpContext.user.details.id
      };
      const id = req.params.id as string;
      const response = await this.carService.update(id, request);
      successResultResponse({
        res,
        data: response,
        message: 'Car updated',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpPut(
    '/restore/:id',
    checkRoleMiddleware([EnumRoleUser.ADMIN, EnumRoleUser.SUPERADMIN])
  )
  public async restore(@request() req: Request, @response() res: Response) {
    try {
      const id = req.params.id as string;
      await this.carService.restore(id);
      successResponse({
        res,
        message: 'Car restored',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpDelete(
    '/:id',
    checkRoleMiddleware([EnumRoleUser.ADMIN, EnumRoleUser.SUPERADMIN])
  )
  public async destroy(@request() req: Request, @response() res: Response) {
    try {
      const id = req.params.id as string;
      await this.carService.softDelete(id);
      successResponse({
        res,
        message: 'Car deleted',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }

  @httpDelete(
    '/force/:id',
    checkRoleMiddleware([EnumRoleUser.ADMIN, EnumRoleUser.SUPERADMIN])
  )
  public async forceDestroy(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      const id = req.params.id as string;
      await this.carService.hardDelete(id);
      successResponse({
        res,
        message: 'Car deleted permanently',
        status: 200
      });
    } catch (error) {
      errorResponse({ error: error as Error, res });
    }
  }
}
