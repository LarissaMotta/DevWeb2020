import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { commonFunctions } from "./header.jquery.js";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  logoSrc: string = "assets/logos/icon-beautycontrol-white.png";

  @ViewChild('sidenav') sidenavElem: ElementRef;
  @ViewChild('dropdown') dropdownElem: ElementRef;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    commonFunctions.initSideNav(this.sidenavElem.nativeElement.id);
    console.log(this.sidenavElem.nativeElement.id);
    console.log(this.dropdownElem.nativeElement.id);
  }
}