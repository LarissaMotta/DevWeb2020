import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import * as M from "materialize-css";
import { AuthService } from "src/app/services/auth.service";
import { Observable, Subscription } from "rxjs";
import { Role } from "src/app/enums/role.enum";
import User from "src/app/models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  logoSrc: string;
  avatarDefaultSrc: string;
  currentUser: User;
  isLoggedIn: boolean;

  private subscriptions: Subscription;

  @ViewChild("sidenav") sidenavElem: ElementRef;
  @ViewChild("userTooltip") tooltipElem: ElementRef;

  constructor(private authService: AuthService) {
    this.logoSrc = "assets/logos/icon-beautycontrol-white.png";
    this.avatarDefaultSrc = "assets/usuarios/usuario-sem-avatar.jpg";
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoggedIn.subscribe({
        next: (isLoggedIn: boolean) => {
          this.isLoggedIn = isLoggedIn;
          this.initGetCurrentUser();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === Role.ADMIN;
  }

  get userAvatar(): string {
    return this.currentUser?.avatar
      ? this.currentUser.avatar
      : this.avatarDefaultSrc;
  }

  get titleInfoUser(): string {
    return `${this.currentUser?.name} - ${this.currentUser?.email}`;
  }

  onLogout(): void {
    this.authService.logout();
  }

  private initGetCurrentUser() {
    this.subscriptions.add(
      this.authService.currentUser.subscribe({
        next: (user: User) => {
          this.currentUser = user;
          if (user) { this.initMaterializeComponents() };
        }
      })
    );
  }

  private initMaterializeComponents(): void {
    M.Sidenav.init(this.sidenavElem.nativeElement, {});
    M.Tooltip.init(this.tooltipElem.nativeElement, {
      html: `${this.currentUser.name}<br>${this.currentUser.email}`,
      margin: 0,
    });
  }
}
