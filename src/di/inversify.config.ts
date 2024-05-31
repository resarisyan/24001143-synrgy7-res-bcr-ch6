import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthController } from '../controllers/AuthController.js';
import { AuthService } from '../services/AuthService.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { TokenRepository } from '../repositories/TokenRepository.js';
import { UserModel } from '../models/UserModel.js';
import TYPES from './types.js';
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js';
import { CarRepository } from '../repositories/CarRepository.js';
import { CarModel } from '../models/CarModel.js';
import { CarService } from '../services/CarService.js';
import { CarController } from '../controllers/CarController.js';
import { AdminController } from '../controllers/superadmin/AdminController.js';
import { AdminService } from '../services/AdminService.js';
const diContainer = new Container();
// Controllers
diContainer.bind<AuthController>(TYPES.AuthController).to(AuthController);
diContainer.bind<CarController>(TYPES.CarController).to(CarController);
diContainer.bind<AdminController>(TYPES.AdminController).to(AdminController);
// Services
diContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
diContainer.bind<CarService>(TYPES.CarService).to(CarService);
diContainer.bind<AdminService>(TYPES.AdminService).to(AdminService);
// Repositories
diContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
diContainer.bind<TokenRepository>(TYPES.TokenRepository).to(TokenRepository);
diContainer.bind<CarRepository>(TYPES.CarRepository).to(CarRepository);
//Model
diContainer.bind<typeof UserModel>(TYPES.UserModel).toConstantValue(UserModel);
diContainer.bind<typeof CarModel>(TYPES.CarModel).toConstantValue(CarModel);
//Middleware
diContainer.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
export { diContainer };
