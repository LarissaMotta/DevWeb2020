import { StatusProduct } from './../enums/status-product.enum';
import { Category } from "./../enums/category.enum";

export default class Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  runnigOutOfStock: number;
  category: Category;
  status: StatusProduct;
  img: string;

  constructor() {
    this.name = "";
    this.description = "";
    this.quantity = 0;
    this.runnigOutOfStock = 0;
    this.category = Category.FACE;
    this.status = StatusProduct.OUT_OF_STOCK;
    this.img = "";
  }
}