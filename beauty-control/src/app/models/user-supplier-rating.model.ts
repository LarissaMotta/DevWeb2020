import User from './user.model';
import Supplier from './supplier.model';

export class UserSupplierRating {
  id: number;
  rating: number;
  user: User;
  supplier: Supplier;

  constructor(ratingValue: number, user: User, supplier: Supplier) {
    this.rating = ratingValue;
    this.user = user;
    this.supplier = supplier;
  }
}
