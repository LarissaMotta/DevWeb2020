import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as M from 'materialize-css';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  logoSrc: string = "assets/logos/icon-beautycontrol-white.png";

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(function () {
      const elem: Element = document.getElementById("side-navbar");
      M.Sidenav.init(elem);
    }, 0);
  }
}
