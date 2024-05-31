import { CarModel } from '../../models/CarModel';
import { UserModel } from '../../models/UserModel';
import { toUserResponse, UserResponse } from './user-response';

export type CarResponse = {
  id: string;
  capacity: number;
  model: string;
  year: number;
  plate: string;
  manufacture: string;
  image: string;
  rentPerDay: number;
  description: string;
  transmission: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy: UserResponse;
  updatedBy?: UserResponse | null;
  deletedBy?: UserResponse | null;
};

export function toCarResponse(car: CarModel): CarResponse {
  return {
    id: car.id,
    capacity: car.capacity,
    model: car.model,
    year: car.year,
    plate: car.plate,
    manufacture: car.manufacture,
    image: car.image,
    rentPerDay: car.rentPerDay,
    description: car.description,
    transmission: car.transmission,
    createdAt: car.created_at,
    updatedAt: car.updated_at,
    deletedAt: car.deleted_at ? car.deleted_at : null,
    createdBy: toUserResponse(car.createdBy as UserModel),
    updatedBy: car.updatedBy
      ? toUserResponse(car.updatedBy as UserModel)
      : null,
    deletedBy: car.deletedBy ? toUserResponse(car.deletedBy as UserModel) : null
  };
}
