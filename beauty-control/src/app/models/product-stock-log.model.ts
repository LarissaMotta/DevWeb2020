import Product from 'src/app/models/product.model';
import User from './user.model';
import Supplier from './supplier.model';
import { StatusStock } from './../enums/status-stock.enum';

export default class ProductStockLog {
  id: number;
  quantity: number;
  date: Date;
  status: StatusStock;
  product: Product;
  supplier: Supplier;
  user: User;

  constructor() {
    this.quantity = 0;
    this.product = new Product();
    this.supplier = new Supplier();
    this.user = new User();
  }
}
