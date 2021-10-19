import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest()

    try {
      const jwt = request.cookies['jwt']
      const { id, scope } = this.jwtService.verify(jwt)
      const is_admin = request.path.toString().indexOf('api/admin') >= 0;
      const user = await this.userService.findOne({ id })

      request.user = user;

      return is_admin && scope === 'admin' || !is_admin && scope === 'user'

    } catch (e) {
      return false;
    }
  }
}
