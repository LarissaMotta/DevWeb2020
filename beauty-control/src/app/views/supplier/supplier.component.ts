import { Component, OnInit } from "@angular/core";
import { SupplierService } from "src/app/services/supplier.service";
import { ToastMessageService } from "src/app/services/toast-message.service";
import { ConfirmationService } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";
import { normalizeFormLayout } from "src/app/utils/form-normalized.util";
import Supplier from "src/app/models/supplier.model";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.scss"],
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[];
  selectedSupplier: Supplier;
  handleSupplier: Supplier;
  showSupplierDialog: boolean;
  formSubmitted: boolean;
  isNewSupplier: boolean;

  constructor(
    private supplierService: SupplierService,
    private toastMessageService: ToastMessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.supplierService.getAll().subscribe({
      next: (data: Supplier[]) => (this.suppliers = data),
      error: (error: HttpErrorResponse) =>
        this.toastMessageService.showToastError(error.message),
    });
  }

  onRowSelect(): void {
    this.handleSupplier = { ...this.selectedSupplier };
    this.isNewSupplier = false;
    this.showSupplierDialog = true;
    normalizeFormLayout();
  }

  hideDialog(): void {
    this.showSupplierDialog = false;
    this.formSubmitted = false;
  }

  onClickBtnCreate(): void {
    this.handleSupplier = new Supplier();
    this.isNewSupplier = true;
    this.formSubmitted = false;
    this.showSupplierDialog = true;
    normalizeFormLayout();
  }

  onClickBtnDelete(supplier: Supplier): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja deletar o fornecedor ${supplier.name}?`,
      header: "Atenção",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteProduct(supplier);
      },
    });
  }

  saveSupplier(): void {
    this.formSubmitted = true;
    let isValid: boolean = this.isValidForm(this.handleSupplier);

    if (isValid) {
      this.createOrUpdateSupplier();
      this.hideDialog();
      this.handleSupplier = new Supplier();
    }
  }

  createOrUpdateSupplier(): void {
    if (this.isNewSupplier) {
      this.createSupplier(this.handleSupplier);
    } else {
      this.updateSupplier(this.handleSupplier);
    }
  }

  createSupplier(supplier: Supplier): void {
    this.supplierService.create(supplier).subscribe({
      next: (supplierCreated: Supplier) => {
        this.suppliers.push(supplierCreated);
        this.suppliers = [...this.suppliers];
        this.toastMessageService.showToastSuccess(
          "Fornecedor criado com sucesso."
        );
      },
      error: (error: HttpErrorResponse) =>
        this.toastMessageService.showToastError(error.message),
    });
  }

  updateSupplier(supplier: Supplier): void {
    this.supplierService.update(supplier, supplier.id).subscribe({
      next: (supplierUpdated: Supplier) => {
        let supplierIndex: number = this.suppliers.findIndex(
          (val: Supplier, i: number) => val.id == supplier.id
        );
        this.suppliers[supplierIndex] = supplierUpdated;
        this.suppliers = [...this.suppliers];
        this.toastMessageService.showToastSuccess(
          "Fornecedor atualizado com sucesso."
        );
      },
      error: (error: HttpErrorResponse) =>
        this.toastMessageService.showToastError(error.message),
    });
  }

  deleteProduct(supplier: Supplier): void {
    this.supplierService.delete(supplier.id).subscribe({
      next: () => {
        this.suppliers = this.suppliers.filter((val) => val.id !== supplier.id);
        this.handleSupplier = new Supplier();
        this.toastMessageService.showToastSuccess(
          "Fornecedor deletado com sucesso."
        );
      },
      error: (error: HttpErrorResponse) =>
        this.toastMessageService.showToastError(error.message),
    });
  }

  normalizeNumberFields(): void {
    if (!this.handleSupplier.rating) {
      this.handleSupplier.rating = 0;
    }
  }

  private isValidForm(supplier: Supplier): boolean {
    if (!supplier.name.trim() || supplier.rating < 0) {
      return false;
    } else {
      return true;
    }
  }
}
