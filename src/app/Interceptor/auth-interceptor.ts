import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../Services/user';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(User);
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
