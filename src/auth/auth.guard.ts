import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard1 implements CanActivate {

  constructor(private jwtService: JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const access_token = request.headers['authorization'].split(' ')[1];
    if (!access_token) {
      return false;
    }

    try{
      const payload = this.jwtService.verify(access_token);
      if (!payload) {
        return false;

        request.userId = payload.sub;
        request.role = payload.isAdmin;
        return true;
      }
    }catch(err){
      return false;
    }
    const user = request.user;
    return true;
  }
}
