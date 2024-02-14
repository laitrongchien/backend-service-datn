import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchRoles = (roles: string[], userRoles: string) => {
  return roles.some((role) => role === userRoles);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log(roles);
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as any;
    // console.log(req);
    const user = req.user;
    return matchRoles(roles, user.role);
  }
}
