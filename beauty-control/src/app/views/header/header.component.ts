import { UserService } from "./../../services/user.service";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import * as M from "materialize-css";
import { AuthService } from "src/app/services/auth.service";
import { Observable, pipe } from "rxjs";
import User from "src/app/models/user.model";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  logoSrc: string;
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User>;

  @ViewChild("sidenav") sidenavElem: ElementRef;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.currentUser$ = this.userService.currentUser;
    this.logoSrc = "assets/logos/icon-beautycontrol-white.png";
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sidenavElem.nativeElement, {});
  }

  onLogout(): void {
    this.authService.logout();
  }
}
