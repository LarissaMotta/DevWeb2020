import { environment } from "./../../environments/environment";
import { AuthService } from "src/app/services/auth.service";
import { baseUrl } from "./../routes/base.route";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl: boolean = request.url.startsWith(baseUrl);
    const isAuthenticate: boolean = this.authService.authenticate();

    if (isAuthenticate && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(environment.tokenKey)}`,
        }
      });
    }

    return next.handle(request);
  }
}
