import { AfterViewInit, Component, OnInit } from '@angular/core';
import { normalizeFormLayout } from 'src/app/utils/form-normalized.util';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    normalizeFormLayout();
  }
}
