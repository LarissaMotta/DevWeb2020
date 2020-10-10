import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { endpoints } from "../routes/auth.route";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import User from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserValue: BehaviorSubject<User>;
  private loggedIn: BehaviorSubject<boolean>;
  private httpOptions = {};

  constructor(protected http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
      }),
    };
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.currentUserValue = new BehaviorSubject<User>(null);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get currentUser(): Observable<User> {
    return this.getCurrentUser();
  }

  authenticate(): boolean {
    let isLoggedIn: boolean = this.loggedIn.value;

    if (!isLoggedIn) {
      const tokenId: string = localStorage.getItem(environment.tokenKey);

      if (tokenId) {
        isLoggedIn = true;
      } else {
        isLoggedIn = false;
        this.logout();
      }

      this.loggedIn.next(isLoggedIn);
    }

    return isLoggedIn;
  }

  login(email: string, password: string): Observable<void> {
    return this.http
      .post<any>(endpoints.login, { email, password }, this.httpOptions)
      .pipe(
        map((response: any) => {
          localStorage.setItem(environment.tokenKey, response.access_token);
          this.router.navigate(["/home"]);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(environment.tokenKey);
    this.loggedIn.next(false);
    this.currentUserValue.next(null);
    this.router.navigate(["/login"]);
  }

  private getCurrentUser(): Observable<User> {
    if (this.currentUserValue.value) {
      return this.currentUserValue.asObservable();
    }

    return this.http.get<User>(endpoints.getCurrentUser, this.httpOptions).pipe(
      map((user: User) => {
        this.currentUserValue.next(user);
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error.error.message);
        this.logout();
        return throwError(error);
      })
    );
  }
}
