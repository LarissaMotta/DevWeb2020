import { Category } from '../enums/category.enum';

export default class Supplier {
  id: number;
  name: string;
  telephone: string;
  observation: string;
  rating: number;
  categories: Category[];

  constructor() {
    this.name = "";
    this.telephone = "";
    this.observation = "";
    this.rating = 0;
    this.categories = [];
  }
}