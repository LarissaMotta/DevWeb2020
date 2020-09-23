import { Category } from "./../enums/category.enum";

export default class Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  category: Category;

  constructor() {
    this.name = "";
    this.description = "";
    this.quantity = 0;
    this.category = Category.FACE;
  }
}