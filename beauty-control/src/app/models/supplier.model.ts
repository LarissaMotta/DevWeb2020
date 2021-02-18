import { Category } from '../enums/category.enum';

export default class Supplier {
  id: number;
  name: string;
  telephone: string;
  observation: string;
  avgRating: number;
  userRating: number;
  categories: Category[];

  constructor() {
    this.name = "";
    this.telephone = "";
    this.observation = "";
    this.avgRating = 0;
    this.userRating = 0;
    this.categories = [];
  }
}