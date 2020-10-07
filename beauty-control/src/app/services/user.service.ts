import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { endpoints } from "../routes/user.route";
import { Observable, throwError } from "rxjs";
import { BaseService } from "./base.service";
import { AuthService } from "./auth.service";
import { catchError } from "rxjs/operators";
import User from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService<User> {
  private currentUserValue: Observable<User>;

  constructor(protected http: HttpClient, private authService: AuthService) {
    super(http, endpoints.baseUrl);
    this.currentUserValue = this.http
      .get<User>(endpoints.getCurrentUser, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error.error.message);
          this.authService.logout();

          return throwError(error);
        })
      );
  }

  get currentUser(): Observable<User> {
    return this.currentUserValue;
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(
      endpoints.getUserByEmail.replace("{email}", email),
      this.httpOptions
    );
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(
      endpoints.getUserById.replace("{id}", id),
      this.httpOptions
    );
  }
}
