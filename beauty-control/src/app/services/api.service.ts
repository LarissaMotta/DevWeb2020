import { HttpHeaders } from "@angular/common/http";

export abstract class ApiService {
  protected httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" }),
  };

  constructor() {}
}
