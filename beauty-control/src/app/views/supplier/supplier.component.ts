import { Component, OnInit, OnDestroy } from "@angular/core";
import { SupplierService } from "src/app/services/supplier.service";
import { ToastMessageService } from "src/app/services/toast-message.service";
import { ConfirmationService } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";
import { normalizeFormLayout } from "src/app/utils/form-normalized.util";
import { Subscription } from "rxjs";
import Supplier from "src/app/models/supplier.model";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.scss"],
})
export class SupplierComponent implements OnInit, OnDestroy {
  suppliers: Supplier[];
  selectedSupplier: Supplier;
  handleSupplier: Supplier;
  showSupplierDialog: boolean;
  formSubmitted: boolean;
  isNewSupplier: boolean;
  loading: boolean;

  private subscriptions: Subscription[];

  constructor(
    private supplierService: SupplierService,
    private toastMessageService: ToastMessageService,
    private confirmationService: ConfirmationService
  ) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(
      this.supplierService.getAll().subscribe({
        next: (data: Supplier[]) => this.suppliers = this.supplierService.sort(data, "name"),
        error: (error: HttpErrorResponse) => this.toastMessageService.showToastError(error.error.message),
        complete: () => this.loading = false
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
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
      acceptLabel: "Sim",
      rejectLabel: "Não",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteSupplier(supplier);
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
    this.normalizeTelphone();
    this.normalizeNumberFields();

    if (this.isNewSupplier) {
      this.createSupplier(this.handleSupplier);
    } else {
      this.updateSupplier(this.handleSupplier);
    }
  }

  createSupplier(supplier: Supplier): void {
    this.subscriptions.push(
			this.supplierService.create(supplier).subscribe({
				next: (supplierCreated: Supplier) => {
					this.suppliers.push(supplierCreated);
					this.suppliers = this.supplierService.sort([...this.suppliers], "name");
					this.toastMessageService.showToastSuccess("Fornecedor criado com sucesso.");
				},
				error: (error: HttpErrorResponse) =>
					this.toastMessageService.showToastError(error.error.message),
			})
		);
  }

  updateSupplier(supplier: Supplier): void {
    this.subscriptions.push(
			this.supplierService.update(supplier, supplier.id).subscribe({
				next: (supplierUpdated: Supplier) => {
					let supplierIndex: number = this.suppliers.findIndex(
						(val: Supplier, i: number) => val.id == supplier.id
					);
					this.suppliers[supplierIndex] = supplierUpdated;
					this.suppliers = this.supplierService.sort([...this.suppliers], "name");
					this.toastMessageService.showToastSuccess("Fornecedor atualizado com sucesso.");
				},
				error: (error: HttpErrorResponse) =>
					this.toastMessageService.showToastError(error.error.message),
			})
		);
  }

  deleteSupplier(supplier: Supplier): void {
    this.subscriptions.push(
			this.supplierService.delete(supplier.id).subscribe({
				next: () => {
					this.suppliers = this.suppliers.filter((val) => val.id !== supplier.id);
					this.handleSupplier = new Supplier();
					this.toastMessageService.showToastSuccess("Fornecedor deletado com sucesso.");
				},
				error: (error: HttpErrorResponse) =>
					this.toastMessageService.showToastError(error.error.message),
			})
		);
  }

  setMaskPhoneNumber(supplier: Supplier): string {
    const phoneNumber: string = supplier.telephone;

    if (phoneNumber) {
      return `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(
        2,
        7
      )}-${phoneNumber.substring(7, 11)}`;
    }

    return "";
  }

  private isValidForm(supplier: Supplier): boolean {
    if (!supplier.name.trim() || supplier.rating < 0) {
      return false;
    } else {
      return true;
    }
  }

  private normalizeNumberFields(): void {
    if (!this.handleSupplier.rating) {
      this.handleSupplier.rating = 0;
    }
  }

  private normalizeTelphone(): void {
    this.handleSupplier.telephone = this.handleSupplier.telephone.replace(
      /[() -]/g,
      ""
    );
  }
}
