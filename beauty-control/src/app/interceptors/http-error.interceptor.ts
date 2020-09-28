import { AuthService } from "src/app/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(this.handleError(error));
      })
    );
  }

  private handleError(error: HttpErrorResponse): HttpErrorResponse {
    this.buildErrorMessage(error);
    this.handleErrorsByStatus(error);

    return error;
  }

  private buildErrorMessage(error: HttpErrorResponse): void {
    if (!error.error.message) {
      error.error.message =
        "Um erro ocorreu no sistema. Favor contatar a equipe de desenvolvimento.";
    }
  }

  private handleErrorsByStatus(error: HttpErrorResponse): void {
    // 401 Unauthorized
    // 403 Forbidden
    const statusErrors: number[] = [401, 403];

    if (statusErrors.includes(error.status)) {
      this.authService.logout();
    }
  }

  private buildConsoleErrorMessage(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
  }
}
