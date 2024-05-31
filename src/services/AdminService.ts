import { inject, injectable } from 'inversify';
import { UserRepository } from '../repositories/UserRepository';
import TYPES from '../di/types';
import { toUserResponse, UserResponse } from '../dtos/response/user-response';
import { UserValidation } from '../validators/user-validation';
import { Validation } from '../validators';
import { UpdateUserRequest } from '../dtos/request/user-request';
import {
  PaginatedResponse,
  toPaginatedResponse
} from '../dtos/response/paginate-response';
import { PageRequest } from '../dtos/request/page-request';
import { PageValidation } from '../validators/page-validation';
import { ResponseError } from '../handlers/response-error';
import { EnumRoleUser } from '../enums/role-user-enum';

@injectable()
export class AdminService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {
    this.userRepository = userRepository;
  }

  public async update(
    id: string,
    req: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateAdminRequest = Validation.validate(UserValidation.UPDATE, req);
    const user = await this.userRepository.findOne({ id });
    const userExists = await this.userRepository.findByUsername(
      updateAdminRequest.username as string
    );
    if (userExists && userExists.id !== user.id) {
      throw new ResponseError(400, 'Username already exists');
    }
    const carUpdated = await this.userRepository.update(
      { id: user.id },
      {
        ...updateAdminRequest
      }
    );
    return toUserResponse(carUpdated);
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }

  public async getAll(
    req: PageRequest
  ): Promise<PaginatedResponse<UserResponse>> {
    const request = Validation.validate(PageValidation.PAGE, req);
    const users = await this.userRepository.getAllPaginated({
      page: request.page,
      limit: request.size,
      item: { role: EnumRoleUser.ADMIN }
    });

    if (users.results.length === 0) {
      throw new ResponseError(404, 'Users not found');
    }

    return toPaginatedResponse(users, request, toUserResponse);
  }

  public async getById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ id });
    return toUserResponse(user);
  }

  public async getByUsername(username: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ username });
    return toUserResponse(user);
  }
}
