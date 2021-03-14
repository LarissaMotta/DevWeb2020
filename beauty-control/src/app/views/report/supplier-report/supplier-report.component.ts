import { ProductWorkflowData } from './../../../models/product-workflow.model';
import { Subscription } from "rxjs";
import { ToastMessageService } from "src/app/services/toast-message.service";
import { ReportService } from "./../../../services/report.service";
import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { BestSupplier } from "src/app/models/best-supplier.model";
import { ProductPurchased } from "src/app/models/product-purchased.model";
import { HttpErrorResponse } from "@angular/common/http";
import * as Highcharts from "highcharts";
import theme from "highcharts/themes/dark-unica";
import drilldown from "highcharts/modules/drilldown";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import accessibility from "highcharts/modules/accessibility";

@Component({
  selector: "app-supplier-report",
  templateUrl: "./supplier-report.component.html",
  styleUrls: ["./supplier-report.component.scss"],
})
export class SupplierReportComponent implements OnInit, OnDestroy, AfterViewInit {
  suppliersRatings: BestSupplier[];
  rating?: number;
  loadingSuppliersRatings: boolean;

  productsPurchasedBySuppliers: ProductPurchased[];
  startDate?: Date;
  endDate?: Date;
  loadingProductsPurchased: boolean;

  private subscriptions: Subscription;

  constructor(
    private reportService: ReportService,
    private toastMessageService: ToastMessageService
  ) {
    this.subscriptions = new Subscription();
    this.loadingSuppliersRatings = true;
    this.loadingProductsPurchased = true;
  }

  ngOnInit(): void {
    this.getSupplierRating();
    this.getProductPurchasedBySupplier();
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

  onInputRatingFilter(): void {
    if (this.rating && this.rating < 0 || this.rating > 5) { 
      return; 
    }
    
    this.getSupplierRating(this.rating);
  }

  onSelectDateFilter(): void {
    if (this.startDate && this.endDate && this.startDate > this.endDate) { 
      return; 
    }
    
    this.getProductPurchasedBySupplier(this.startDate, this.endDate);
  }

  private getSupplierRating(rating?: number): void {
    this.subscriptions.add(
      this.reportService.getSupplierRating(rating).subscribe({
        next: (data: BestSupplier[]) => {
          this.suppliersRatings = data;
          this.buildSupplierRatingChart();
        },
        error: (error: HttpErrorResponse) =>
          this.toastMessageService.showToastError(error.error.message),
        complete: () => this.loadingSuppliersRatings = false
      })
    );
  }

  private getProductPurchasedBySupplier(startDate?: Date, endDate?: Date): void {
    this.subscriptions.add(
      this.reportService.getProductPurchasedBySupplier(startDate, endDate).subscribe({
        next: (data: ProductPurchased[]) => {
          this.productsPurchasedBySuppliers = data;
          this.buildProductPurchasedChart();
        },
        error: (error: HttpErrorResponse) =>
          this.toastMessageService.showToastError(error.error.message),
        complete: () => this.loadingProductsPurchased = false
      })
    );
  }

  private buildSupplierRatingChart(): void {
    const data: any[] = this.getDataSupplierRating(this.suppliersRatings);

    const chartOptions: Highcharts.Options = {
      chart: {
        type: "column",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Top 10 Fornecedores",
        style: {
          fontWeight: "bold",
          fontSize: "2rem",
        },
      },
      subtitle: {
        text: "Fornecedores com maiores avaliações",
      },
      xAxis: {
        type: "category",
        title: {
          text: "Fornecedores",
          style: {
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#FFF",
          },
        },
        labels: {
          style: {
            fontSize: "1rem",
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Avaliações (0 à 5)",
          style: {
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#FFF",
          },
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
      tooltip: {
        pointFormat:
          "Média de Avaliações dos Usuários: <b>{point.y:.2f} estrelas</b>",
      },
      series: [
        {
          name: "Avaliações",
          type: "column",
          colorByPoint: true,
          data: data,
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#FFFFFF",
            format: "{point.y:.2f}",
            y: 25,
            style: {
              fontSize: "1rem",
            },
          },
        },
      ],
    };

    Highcharts.chart("supplier-rating-chart", chartOptions);
  }

  private buildProductPurchasedChart(): void {
    const dataSupplier: any[] = this.getDataProductPurchasedTotal(this.productsPurchasedBySuppliers);
    const seriesProduct: any[] = this.getSeriesProductPurchased(this.productsPurchasedBySuppliers);

    const purchasedTotal: number = dataSupplier.reduce((acc: number, curr: any) => acc + curr.y, 0);

    const chartOptions: Highcharts.Options = {
      chart: {
        type: "pie"
      },
      lang: {
        drillUpText: "<< Voltar para Fornecedores"
      },
      credits: {
        enabled: false
      },
      title: {
        text: "Produtos comprados",
        style: {
          fontWeight: "bold",
          fontSize: "2rem",
        },
      },
      subtitle: {
        text: "Produtos comprados por Fornecedor",
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              let percentage: number = 0;
              
              if (this.y) {
                percentage = (this.y / purchasedTotal) * 100;
              }

              return `${this.point.name}: ${this.y} (${percentage.toFixed(2)}%)`;
            }
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
        formatter: function() {
          return `<span>${this.point.name}</span><br/>
                  <span><b>${this.point.y}</b> itens</span><br/>`
        }
      },
      series: [
        {
          name: "Produtos Comprados",
          type: "pie",
          colorByPoint: true,
          data: dataSupplier
        },
      ],
      drilldown: {
        series: seriesProduct
      },
    };

    Highcharts.chart("product-purchased-chart", chartOptions);
  }

  private getDataSupplierRating(suppliersRatings: BestSupplier[]): any[] {
    return suppliersRatings
      .sort((a: BestSupplier, b: BestSupplier) => b.averageRating - a.averageRating)
      .slice(0, 10)
      .map((s: BestSupplier) => [s.name, s.averageRating]);
  }

  private getDataProductPurchasedTotal(productPurchased: ProductPurchased[]): any[] {
    return productPurchased
      .map((p: ProductPurchased) => {
        return {
          name: p.name,
          y: p.products.reduce(
            (accumulator: number, currentValue: ProductWorkflowData) => 
              accumulator + currentValue.quantity, 0
          ),
          drilldown: p.id.toString()
        };
      });
  }

  private getSeriesProductPurchased(productPurchased: ProductPurchased[]): any[] {
    return productPurchased
      .map((p: ProductPurchased) => {
        return {
          id: p.id.toString(),
          name: p.name,
          type: "pie",
          data: p.products.map((pw: ProductWorkflowData) => {
            return {
              name: pw.name,
              y: pw.quantity
            };
          })
        };
      });
  }
}
