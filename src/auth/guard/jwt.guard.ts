import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
