import { inject, injectable } from 'inversify';
import TYPES from '../di/types.js';
import { Validation } from '../validators/index.js';
import { CarRepository } from '../repositories/CarRepository.js';
import {
  CreateCarRequest,
  UpdateCarRequest
} from '../dtos/request/car-request.js';
import { CarResponse, toCarResponse } from '../dtos/response/car-response.js';
import { CarValidation } from '../validators/car-validation.js';
import {
  PaginatedResponse,
  toPaginatedResponse
} from '../dtos/response/paginate-response.js';
import { PageRequest } from '../dtos/request/page-request.js';
import { PageValidation } from '../validators/page-validation.js';
import { ResponseError } from '../handlers/response-error.js';
import cloudinary from '../common/configs/cloudinary.js';

@injectable()
export class CarService {
  private carRepository: CarRepository;
  constructor(@inject(TYPES.CarRepository) carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async create(req: CreateCarRequest): Promise<CarResponse> {
    const createCarRequest = Validation.validate(CarValidation.CREATE, req);
    const resultFile = await cloudinary.uploader.upload(createCarRequest.image);
    const car = await this.carRepository.insert(
      {
        ...createCarRequest,
        created_by: req.created_by,
        image: resultFile.secure_url
      },
      '[createdBy]'
    );
    return toCarResponse(car);
  }

  public async getAll(
    req: PageRequest
  ): Promise<PaginatedResponse<CarResponse>> {
    const request = Validation.validate(PageValidation.PAGE, req);
    const cars = await this.carRepository.getAllPaginated({
      page: request.page,
      limit: request.size,
      relations: '[createdBy, updatedBy]'
    });
    if (cars.results.length === 0) {
      throw new ResponseError(404, 'Cars not found');
    }

    return toPaginatedResponse(cars, request, toCarResponse);
  }

  public async getAllNotDeleted(
    req: PageRequest
  ): Promise<PaginatedResponse<CarResponse>> {
    const request = Validation.validate(PageValidation.PAGE, req);
    const cars = await this.carRepository.getAllPaginatedNotDeleted(
      request.page,
      request.size
    );
    if (cars.results.length === 0) {
      throw new ResponseError(404, 'Cars not found');
    }

    return toPaginatedResponse(cars, request, toCarResponse);
  }

  public async getById(id: string): Promise<CarResponse> {
    const car = await this.carRepository.findOne(
      { id, deleted_at: null },
      '[createdBy, updatedBy]'
    );
    return toCarResponse(car);
  }

  public async update(id: string, req: UpdateCarRequest): Promise<CarResponse> {
    const updateCarRequest = Validation.validate(CarValidation.UPDATE, req);
    if (updateCarRequest.image) {
      const resultFile = await cloudinary.uploader.upload(
        updateCarRequest.image
      );
      updateCarRequest.image = resultFile.secure_url;
    }
    const car = await this.carRepository.findOne({ id });
    const carUpdated = await this.carRepository.update(
      { id: car.id },
      {
        ...updateCarRequest,
        updated_by: req.updated_by
      },
      '[createdBy, updatedBy]'
    );

    if (updateCarRequest.image) {
      const image = car.image?.split('/').pop()?.split('.')[0];
      if (image) cloudinary.uploader.destroy(image);
    }

    return toCarResponse(carUpdated);
  }

  public async softDelete(id: string): Promise<void> {
    const car = await this.carRepository.findOneNotDeleted({ id });
    await this.carRepository.delete({ id: car.id });
    const image = car.image?.split('/').pop()?.split('.')[0];
    if (image) cloudinary.uploader.destroy(image);
  }

  public async hardDelete(id: string): Promise<void> {
    const car = await this.carRepository.findOneDeleted({ id });
    await this.carRepository.hardDelete({ id: car.id });
    const image = car.image?.split('/').pop()?.split('.')[0];
    if (image) cloudinary.uploader.destroy(image);
  }

  public async restore(id: string): Promise<void> {
    const car = await this.carRepository.findOneDeleted({ id });
    await this.carRepository.restore({ id: car.id });
  }
}
