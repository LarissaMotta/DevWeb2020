import Product from './product.model';
import Supplier from './supplier.model';

export class ProductSupplier {
  id: number;
  quantity: number;
  date: Date;
  product: Product;
  supplier: Supplier;

  constructor() {
    this.quantity = 0;
  }
}
