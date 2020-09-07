import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { endpoints } from "../routes/auth.route";
import { ApiService } from "./api.service";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import User from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    super();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  async getAll(): Promise<User[]> {
    const url: string = endpoints.login;

    return await this.http
      .get<User[]>(url, super.httpOptions)
      .toPromise()
      .then((response: User[]) => response);
  }

  async getUser(email: string): Promise<User> {
    const url: string = endpoints.getUser
      .replace("{email}", email);

    return await this.http
      .get<User[]>(url, super.httpOptions)
      .toPromise()
      .then((response: User[]) => response.shift());
  }

  // TODO modificar codigo com guard quando integrar com o backend
  async login(email: string, password: string): Promise<boolean> {
    return this.getUser(email)
      .then((user: User) => {
        let authenticated: boolean = user && user.password === password;

        if (authenticated) {
          this.loggedIn.next(true);
          this.router.navigate(["/home"]);
        } else {
          console.error("Usuario nao autenticado");
        }
        
        return authenticated;
      });
  }

  async logout(): Promise<void> {
    this.loggedIn.next(false);
    this.router.navigate(["/"]);
  }
}
