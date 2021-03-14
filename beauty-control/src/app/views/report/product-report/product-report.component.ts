import { ToastMessageService } from "./../../../services/toast-message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { ReportService } from "./../../../services/report.service";
import { OnDestroy } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import {
  ProductWorkflow,
  ProductWorkflowData,
} from "./../../../models/product-workflow.model";
import * as Highcharts from "highcharts";
import theme from "highcharts/themes/dark-unica";
import drilldown from "highcharts/modules/drilldown";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import accessibility from "highcharts/modules/accessibility";

@Component({
  selector: "app-product-report",
  templateUrl: "./product-report.component.html",
  styleUrls: ["./product-report.component.scss"],
})
export class ProductReportComponent implements OnInit, OnDestroy, AfterViewInit {
  productsWorkflow: ProductWorkflow;
  startDate?: Date;
  endDate?: Date;
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
    this.getProductWorkFlow();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    theme(Highcharts);
    drilldown(Highcharts);
    exporting(Highcharts);
    exportData(Highcharts);
    accessibility(Highcharts);
  }

  onSelectDateFilter(): void {
    if (this.startDate && this.endDate && this.startDate > this.endDate) { 
      return; 
    }
    
    this.getProductWorkFlow(this.startDate, this.endDate);
  }

  private getProductWorkFlow(startDate?: Date, endDate?: Date): void {
    this.subscriptions.add(
      this.reportService.getProductWorkFlow(startDate, endDate).subscribe({
        next: (data: ProductWorkflow) => {
          this.productsWorkflow = data;
          this.buildProductWorkflowChart();
        },
        error: (error: HttpErrorResponse) =>
          this.toastMessageService.showToastError(error.error.message),
        complete: () => (this.loading = false),
      })
    );
  }

  private buildProductWorkflowChart(): void {
    const inputTotal: number = this.getTotalQuantityWorkflow(
      this.productsWorkflow.inputs
    );
    const outputTotal: number = this.getTotalQuantityWorkflow(
      this.productsWorkflow.outputs
    );
    const workFlowTotal: number = inputTotal + outputTotal;

    const dataInput: any[] = this.getDataWorkflow(this.productsWorkflow.inputs);
    const dataOutput: any[] = this.getDataWorkflow(
      this.productsWorkflow.outputs
    );

    const chartOptions: Highcharts.Options = {
      chart: {
        type: "pie",
      },
      lang: {
        drillUpText: "<< Voltar para Fluxos",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Fluxo de Produtos",
        style: {
          fontWeight: "bold",
          fontSize: "2rem",
        },
      },
      subtitle: {
        text: "Entrada e Saída de Produtos do estoque",
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              let percentage: number = 0;

              if (this.y) {
                percentage = (this.y / workFlowTotal) * 100;
              }

              return `${this.point.name}: ${this.y} (${percentage.toFixed(2)}%)`;
            },
          },
        },
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
      tooltip: {
        headerFormat:
          '<span style="color:{point.color};font-size:13px;">{point.name}</span><br>',
        pointFormat: "<span><b>{point.y}</b> itens</span><br/>",
      },
      series: [
        {
          name: "Fluxos",
          type: "pie",
          colorByPoint: true,
          data: [
            {
              name: "Entrada",
              y: inputTotal,
              drilldown: "input",
            },
            {
              name: "Saída",
              y: outputTotal,
              drilldown: "output",
            },
          ],
        },
      ],
      drilldown: {
        series: [
          {
            id: "input",
            name: "Entrada",
            type: "pie",
            data: dataInput,
          },
          {
            id: "output",
            name: "Saída",
            type: "pie",
            data: dataOutput,
          },
        ],
      },
    };

    Highcharts.chart("product-workflow-chart", chartOptions);
  }

  private getTotalQuantityWorkflow(workflowData: ProductWorkflowData[]): number {
    return workflowData.reduce(
      (acc: number, curr: ProductWorkflowData) => acc + curr.quantity, 0);
  }

  private getDataWorkflow(workflowData: ProductWorkflowData[]): any[] {
    return workflowData.map((p: ProductWorkflowData) => {
      return {
        name: p.name,
        y: p.quantity,
      };
    });
  }
}
