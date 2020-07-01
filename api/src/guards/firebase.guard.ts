import { Injectable, CanActivate, ExecutionContext, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin'
@Injectable()
export class FirebaseGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest()
    const bearerToken = request.headers['Authorization'] as string 
                        || request.headers['authorization'] as string
    const token = bearerToken.split(' ')[1]
    try{
      const decodedToken = await admin.auth().verifyIdToken(token)
      request.user = decodedToken.uid
    }catch(e){
      throw new UnauthorizedException(e)
    }
    return true
  }
}