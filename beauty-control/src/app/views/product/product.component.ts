import { StatusStock } from './../../enums/status-stock.enum';
import { StatusProduct } from './../../enums/status-product.enum';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ConfirmationService } from "primeng/api";
import { ToastMessageService } from "src/app/services/toast-message.service";
import { normalizeFormLayout } from "src/app/utils/form-normalized.util";
import { productDict } from 'src/app/dicts/product.dict';
import { SupplierService } from 'src/app/services/supplier.service';
import { Subscription } from 'rxjs';
import Product from "src/app/models/product.model";
import Supplier from 'src/app/models/supplier.model';
import ProductStockLog from 'src/app/models/product-stock-log.model';
import DataProcessUtil from 'src/app/utils/data-process.util';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[];
  selectedProduct: Product;
  handleProduct: Product;
  showProductDialog: boolean;
  formSubmitted: boolean;
  isNewProduct: boolean;
  loading: boolean;
	selectedFile: File;
	srcNoImage: string;

  handleProductLog: ProductStockLog;
  showProductInputDialog: boolean;
  showProductOutputDialog: boolean;
  suppliers: Supplier[];
  selectedSupplier: Supplier;
  maxOutputProduct: number;

  private subscriptions: Subscription;

  constructor(
    private productService: ProductService,
    private toastMessageService: ToastMessageService,
    private confirmationService: ConfirmationService,
    private supplierService: SupplierService
  ) {
		this.subscriptions = new Subscription();
    this.srcNoImage = "assets/produto/produto-sem-imagem.png";
		this.products = new Array<Product>();
		this.suppliers = new Array<Supplier>();
		this.loading = true;
  }

  ngOnInit(): void {
		this.subscriptions.add(
			this.productService.getAll().subscribe({
				next: (products: Product[]) => {
					this.productService.sort(products, "name")
						.forEach((product: Product) => {
							product.img = null;
							this.products.push(product);
							this.getProductImage(product);
						});
				},
				error: (error: HttpErrorResponse) => this.toastMessageService.showToastError(error.message),
				complete: () => this.loading = false
			})
		);
	}
	
	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

  get categoryDict(): any {
    return productDict.category;
  }

	get statusDict(): any {
		return productDict.status;
	}

  hideDialog(): void {
		this.showProductDialog = false;
		this.showProductInputDialog = false;
		this.showProductOutputDialog = false;
    this.formSubmitted = false;
		this.selectedFile = null;
  }

  onClickBtnCreate(): void {
    this.handleProduct = new Product();
    this.isNewProduct = true;
    this.formSubmitted = false;
    this.showProductDialog = true;
    normalizeFormLayout();
  }

	onClickBtnEdit(product: Product): void {
    this.handleProduct = { ...product };
    this.isNewProduct = false;
    this.showProductDialog = true;
    normalizeFormLayout();
  }

  onClickBtnDelete(product: Product): void {
    this.confirmationService.confirm({
      header: "Atenção",
      message: `Tem certeza que deseja deletar o produto ${product.name}?`,
      acceptLabel: "Sim",
      rejectLabel: "Não",
      icon: "pi pi-exclamation-triangle",
      accept: () => this.deleteProduct(product)
    });
  }

  onClickBtnInput(product: Product): void {
		this.getSuppliers();

		this.handleProductLog = new ProductStockLog();
		this.handleProductLog.product.id = product.id;
		this.handleProductLog.status = StatusStock.INPUT;

		this.formSubmitted = false;
		this.showProductInputDialog = true;
		normalizeFormLayout();
	}
	
	onClickBtnOutput(product: Product): void {
		this.handleProductLog = new ProductStockLog();
		this.handleProductLog.product.id = product.id;
		this.handleProductLog.status = StatusStock.OUTPUT;

		this.maxOutputProduct = product.quantity;
		this.formSubmitted = false;
		this.showProductOutputDialog = true;
		normalizeFormLayout();
  }

	onSelectImageProduct(event: any) {
		if (event.currentFiles && event.currentFiles.length > 0) {
			this.selectedFile = event.currentFiles[0];
		}
	}

  saveProduct(): void {
    this.formSubmitted = true;
    let isValid: boolean = this.isValidForm(this.handleProduct);

    if (isValid) {
      this.createOrUpdateProduct();
      this.hideDialog();
      this.handleProduct = new Product();
    }
  }

  createOrUpdateProduct(): void {
    if (this.isNewProduct) {
      this.createProduct(this.handleProduct);
    } else {
      this.updateProduct(this.handleProduct);
    }
  }

  createProduct(product: Product): void {
		const properties = ["name", "description", "category", "runnigOutOfStock"];
		const formProduct: FormData = DataProcessUtil.convertToFormData(product, properties);
		formProduct.append("img", this.selectedFile);

		this.subscriptions.add(
			this.productService.createAsFormData(formProduct).subscribe({
				next: (productCreated: Product) => {
					this.getProductImage(productCreated);
					productCreated.img = null;
					this.products.push(productCreated);
					this.products = [...this.products];
					this.toastMessageService.showToastSuccess("Produto criado com sucesso.");
				},
				error: (error: HttpErrorResponse) => {
					this.toastMessageService.showToastError(error.error.message);
				}
			})
		);
  }

  updateProduct(product: Product): void {
		const properties = ["id", "name", "description", "category", "runnigOutOfStock"];
		const formProduct: FormData = DataProcessUtil.convertToFormData(product, properties);
		formProduct.set("img", this.selectedFile);

		this.subscriptions.add(
			this.productService.updateAsFormData(formProduct, product.id).subscribe({
				next: (productUpdated: Product) => {
					this.getProductImage(productUpdated);
					let productIndex: number = this.products.findIndex(
						(val: Product, i: number) => val.id == product.id
					);
					productUpdated.img = null;
					productUpdated.quantity = product.quantity;
					productUpdated.status = this.productService.getProductStatus(productUpdated);
					this.products[productIndex] = productUpdated;
					this.products = [...this.products];
					this.toastMessageService.showToastSuccess("Produto atualizado com sucesso.");
				},
				error: (error: HttpErrorResponse) =>
					this.toastMessageService.showToastError(error.message)
			})
		);
  }

  deleteProduct(product: Product): void {
		this.subscriptions.add(
			this.productService.delete(product.id).subscribe({
				next: () => {
					this.products = this.products.filter((val) => val.id !== product.id);
					this.handleProduct = new Product();
					this.toastMessageService.showToastSuccess("Produto deletado com sucesso.");
				},
				error: (error: HttpErrorResponse) => 
					this.toastMessageService.showToastError(error.message)
			})
		);
	}
	
	creditProduct(): void {
		this.formSubmitted = true;
		this.setDropdownProductLogField();

		if (!this.isValidFormStock(this.handleProductLog)) return;

		this.subscriptions.add(
			this.productService.creditProduct(this.handleProductLog).subscribe({
				next: (productInput: any) => {
					let productIndex: number = this.products.findIndex(
						(val: Product, i: number) => val.id == productInput.product
					);
					let productUpdated: Product = this.products[productIndex];
					productUpdated.quantity += productInput.quantity;
					productUpdated.status = this.productService.getProductStatus(productUpdated);
					this.products = [...this.products];
					this.toastMessageService.showToastSuccess("Crédito do produto realizado com sucesso.");
				},
				error: (error: HttpErrorResponse) => 
					this.toastMessageService.showToastError(error.message)
			})
		);
		
		this.hideDialog();
	}

	debitProduct(): void {
		this.formSubmitted = true;

		if (!this.isValidFormStock(this.handleProductLog)) return;

		this.subscriptions.add(
			this.productService.debitProduct(this.handleProductLog).subscribe({
				next: (productOutput: any) => {
					let productIndex: number = this.products.findIndex(
						(val: Product, i: number) => val.id == productOutput.product
					);
					let productUpdated: Product = this.products[productIndex];
					productUpdated.quantity -= productOutput.quantity;
					productUpdated.status = this.productService.getProductStatus(productUpdated);
					this.products = [...this.products];
					this.toastMessageService.showToastSuccess("Débito do produto realizado com sucesso.");
				},
				error: (error: HttpErrorResponse) => 
					this.toastMessageService.showToastError(error.message)
			})
		);
		
		this.hideDialog();
	}

  normalizeNumberFields(): void {
    if (!this.handleProduct.quantity) {
      this.handleProduct.quantity = 0;
    }
	}

  getBadgeClass(status: StatusProduct) {
		const baseClass = (status: string) => `product-badge status-${status}`;

		if (status === StatusProduct.IN_STOCK) return baseClass("instock");
		if (status === StatusProduct.OUT_OF_STOCK) return baseClass("outofstock");
		if (status === StatusProduct.RUNNIG_OUT_OF_STOCK) return baseClass("lowstock");

		return baseClass("none");
	}
	
	getBadgedName(status: StatusProduct) {
		return `${this.statusDict[status].toUpperCase()}`;
	}

	private setDropdownProductLogField(): void {
		if (!this.selectedSupplier && this.suppliers.length > 0) {
			this.handleProductLog.supplier = this.suppliers[0];
		} else {
			this.handleProductLog.supplier = this.selectedSupplier;
		}
	}

  private isValidForm(product: Product): boolean {
    if (!product.name.trim() || product.quantity < 0 || !product.category) {
      return false;
    } else {
      return true;
    }
	}

	private isValidFormStock(inputProduct: ProductStockLog): boolean {
		if (inputProduct.status === StatusStock.INPUT && !inputProduct.supplier.id) {
			return false;
		}

		if (!inputProduct.quantity || inputProduct.quantity <= 0) {
			return false;
		}

		if (inputProduct.status === StatusStock.OUTPUT && inputProduct.quantity > this.maxOutputProduct) {
			return false;
		}

		return true;
	}

  private getSuppliers(): void {
		this.subscriptions.add(
			this.supplierService.getAll().subscribe({
				next: (data: Supplier[]) =>
					this.suppliers = this.supplierService.sort(data, "name"),
				error: (error: HttpErrorResponse) => 
					this.toastMessageService.showToastError(error.error.message)
			})
		);
  }

	private getProductImage(product: Product): void {
		this.subscriptions.add(
			this.productService.getProductImage(product.id).subscribe({
				next: (data: Blob) => this.readImageAsBase64(product, data),
				error: (error: HttpErrorResponse) => {
					// TODO Mudar aqui depois quando consertar os erros de a imagem não encontrada no back
					//this.toastMessageService.showToastError(error.error.message)
					this.readImageAsBase64(product, null);
				}
			})
		);
	}

	private readImageAsBase64(product: Product, blob: Blob): void {
		if (!blob) {
			product.img = this.srcNoImage;
		} else {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => 
				product.img = blob.size > 0 ? reader.result as string : this.srcNoImage;
		}
	}
}
