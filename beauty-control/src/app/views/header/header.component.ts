import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  logoSrc: string = "assets/logos/icon-beautycontrol-white.png";

  constructor() {}

  ngOnInit(): void {}
}
