import Product from './product.model';
import Supplier from './supplier.model';
import User from './user.model';

export class ProductSupplier {
  id: number;
  date: Date;
  product: Product;
  supplier: Supplier;
  user: User;
}
