import { interfaces } from 'inversify-express-utils';
import { EnumRoleUser } from '../../enums/role-user-enum.js';

export class Principal implements interfaces.Principal {
  public details: unknown;
  public constructor(details: unknown) {
    this.details = details;
  }
  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(true);
  }
  public isResourceOwner(resourceId: unknown): Promise<boolean> {
    return Promise.resolve(resourceId === 1111);
  }
  public isInRole(role: EnumRoleUser): Promise<boolean> {
    return Promise.resolve(role === EnumRoleUser.ADMIN);
  }
}
