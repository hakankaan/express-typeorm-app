import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) { }

  canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest()

    try {
      const jwt = request.cookies['jwt']
      const { scope } = this.jwtService.verify(jwt)
      const is_admin = request.path.toString().indexOf('api/admin') >= 0;

      return is_admin && scope === 'admin' || !is_admin && scope === 'user'

    } catch (e) {
      return false;
    }
  }
}
