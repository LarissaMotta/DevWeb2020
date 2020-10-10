import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export abstract class BaseService<T> {
  protected httpOptions = {};

  constructor(protected http: HttpClient, protected baseUrl: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
      }),
    };
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, this.httpOptions);
  }

  create(t: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, JSON.stringify(t), this.httpOptions);
  }

  update(t: T, id: number): Observable<T> {
    return this.http.put<T>(
      `${this.baseUrl}/${id}`,
      JSON.stringify(t),
      this.httpOptions
    );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  sort(collection: T[], propertyName: string): T[] {
    return collection.sort((obj1: T, obj2: T) => {
      if (obj1[propertyName] > obj2[propertyName]) {
        return 1;
      }

      if (obj1[propertyName] < obj2[propertyName]) {
        return -1;
      }

      return 0;
    });
  }
}
