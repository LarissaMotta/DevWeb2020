import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserRoleReport } from "src/app/models/user-role-report.model";
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
  loading: boolean;

  private subscriptions: Subscription;

  constructor(
    private reportService: ReportService,
    private toastMessageService: ToastMessageService
  ) {
    this.subscriptions = new Subscription();
    this.loading = true;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.reportService.getUserRole().subscribe({
        next: (data: UserRoleReport) => {
          this.userRoles = data;
          this.buildUserRolesChart();
        },
        error: (error: HttpErrorResponse) =>
          this.toastMessageService.showToastError(error.error.message),
        complete: () => (this.loading = false),
      })
    );
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

  private buildUserRolesChart(): void {
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
          dataLabels: {
            enabled: true,
            formatter: function () {
              let percentage: number = 0;
              
              if (this.y) {
                percentage = (this.y / totalUsers) * 100;
              }

              return `${this.point.name}: ${this.y} (${percentage.toFixed(2)}%)`;
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
