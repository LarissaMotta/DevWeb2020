import { Category } from "../enums/category.enum";

export class ProductWorkflow {
  inputs: ProductWorkflowData[];
  outputs: ProductWorkflowData[];
}

export class ProductWorkflowData {
  id: number;
  name: string;
  category: Category;
  quantity: number;
}
