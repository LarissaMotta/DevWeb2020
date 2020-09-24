import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { endpoints } from "../routes/auth.route";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean>;
  private httpOptions: any = {};

  constructor(protected http: HttpClient, private router: Router) {
		this.loggedIn = new BehaviorSubject<boolean>(false);
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
      }),
    };
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
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

  login(email: string, password: string): Observable<any> {
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
    localStorage.setItem(environment.tokenKey, null);
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }
}
