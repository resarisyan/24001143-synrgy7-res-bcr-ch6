const TYPES = {
  UserModel: Symbol.for('UserModel'),
  TokenModel: Symbol.for('TokenModel'),
  CarModel: Symbol.for('CarModel'),

  AuthService: Symbol.for('AuthService'),
  CarService: Symbol.for('CarService'),
  AdminService: Symbol.for('AdminService'),

  AuthController: Symbol.for('AuthController'),
  CarController: Symbol.for('CarController'),
  AdminController: Symbol.for('AdminController'),

  TokenRepository: Symbol.for('TokenRepository'),
  UserRepository: Symbol.for('UserRepository'),
  CarRepository: Symbol.for('CarRepository'),

  AuthMiddleware: Symbol.for('AuthMiddleware')
};

export default TYPES;
