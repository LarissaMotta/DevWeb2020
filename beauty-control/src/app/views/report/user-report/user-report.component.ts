import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserRoleReport, UserRoleReportData } from "src/app/models/user-role-report.model";
import { ReportService } from "src/app/services/report.service";
import { ToastMessageService } from "src/app/services/toast-message.service";
import * as Highcharts from "highcharts";
import theme from "highcharts/themes/dark-unica";
import funnel from "highcharts/modules/funnel";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import accessibility from "highcharts/modules/accessibility";

@Component({
  selector: "app-user-report",
  templateUrl: "./user-report.component.html",
  styleUrls: ["./user-report.component.scss"],
})
export class UserReportComponent implements OnInit, OnDestroy, AfterViewInit {
  userRoles: UserRoleReport;
  usersDataSelected: UserRoleReportData[];
  startDate?: Date;
  endDate?: Date;
  loading: boolean;
  showUserTable: boolean;
  headerUserTable: string;

  private subscriptions: Subscription;

  constructor(
    private reportService: ReportService,
    private toastMessageService: ToastMessageService
  ) {
    this.subscriptions = new Subscription();
    this.loading = true;
    this.showUserTable = false;
  }

  ngOnInit(): void {
    this.getUserRole();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    theme(Highcharts);
    funnel(Highcharts);
    exporting(Highcharts);
    exportData(Highcharts);
    accessibility(Highcharts);
  }

  onSelectDateFilter(): void {
    if (this.startDate && this.endDate && this.startDate > this.endDate) { 
      return; 
    }
    
    this.getUserRole(this.startDate, this.endDate);
  }

  onClickSeriesChart(index: number): void {
    // Funcionário = 0
    // Admin = 1

    if (index === 0) {
      this.headerUserTable = "Tabela de Funcionários";
      this.usersDataSelected = this.userRoles.employee;
    }
    else {
      this.headerUserTable = "Tabela de Administradores";
      this.usersDataSelected = this.userRoles.admin;
    }

    this.showUserTable = true;
  }

  private getUserRole(startDate?: Date, endDate?: Date): void {
    this.subscriptions.add(
      this.reportService.getUserRole(startDate, endDate).subscribe({
        next: (data: UserRoleReport) => {
          this.userRoles = data;
          this.buildUserRolesChart();
        },
        error: (error: HttpErrorResponse) =>
          this.toastMessageService.showToastError(error.error.message),
        complete: () => this.loading = false
      })
    );
  }

  private buildUserRolesChart(): void {
    const context: UserReportComponent = this;
    const data: any[] = this.getDataUsersRole(this.userRoles);
    const totalUsers: number = data.reduce((acc: number, curr: any[]) => acc + curr[1], 0);

    const chartOptions: Highcharts.Options = {
      chart: {
        type: "pyramid",
      },
      credits: {
        enabled: false
      },
      title: {
        text: "Perfis de Usuários",
        style: {
          fontWeight: "bold",
          fontSize: "2rem",
        },
      },
      subtitle: {
        text: "Quantidade de Usuários Por Função",
      },
      plotOptions: {
        series: {
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            formatter: function () {
              let percentage: number = 0;
              
              if (this.y) {
                percentage = (this.y / totalUsers) * 100;
              }

              return `${this.point.name}: ${this.y} (${percentage.toFixed(2)}%)`;
            }
          },
          point: {
            events: {
              click: function() {
                context.onClickSeriesChart(this.index);
              }
            }
          }
        },
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            symbolFill: "#fff",
            symbolStroke: "#fff",
          },
        },
      },
      series: [
        {
          type: "pyramid",
          name: "Usuários únicos",
          width: "60%",
          data: data,
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              plotOptions: {
                series: {
                  dataLabels: {
                    inside: true,
                  }
                },
              },
            },
          },
        ],
      },
    };

    Highcharts.chart("user-role-chart", chartOptions);
  }

  private getDataUsersRole(usersRole: UserRoleReport): any[] {
    return [
      ["Funcionários", usersRole.employee.length],
      ["Administradores", usersRole.admin.length]
    ]
  }
}
