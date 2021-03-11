import { ProductWorkflowData } from "./product-workflow.model";

export class ProductPurchased {
  id: number;
  name: string;
  products: ProductWorkflowData[];
}