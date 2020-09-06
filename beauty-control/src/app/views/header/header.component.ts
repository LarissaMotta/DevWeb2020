import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import * as M from "materialize-css";
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  logoSrc: string = "assets/logos/icon-beautycontrol-white.png";
  isLoggedIn$: Observable<boolean>;

  @ViewChild("sidenav") sidenavElem: ElementRef;

  constructor(private authService: AuthService) { }

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
