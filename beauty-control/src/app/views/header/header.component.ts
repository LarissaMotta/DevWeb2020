import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import * as M from "materialize-css";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  logoSrc: string = "assets/logos/icon-beautycontrol-white.png";

  @ViewChild("sidenav") sidenavElem: ElementRef;
  @ViewChild("dropdown") dropdownElem: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sidenavElem.nativeElement, {});
  }
}
