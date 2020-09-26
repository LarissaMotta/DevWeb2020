import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title: string;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.title = "beauty-control";
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
