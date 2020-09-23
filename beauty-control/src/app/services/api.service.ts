import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

export abstract class ApiService<T> {
  protected httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" }),
  };

  constructor(
		protected http: HttpClient,
		protected baseUrl: string
	) {}
	
	get(id: number): Observable<T> {
		return this.http.get<T>(`${this.baseUrl}/${id}`, this.httpOptions);
	}

	getAll(): Observable<T[]> {
		return this.http.get<T[]>(this.baseUrl, this.httpOptions);
	}

	create(t: T): Observable<T> {
		return this.http.post<T>(this.baseUrl, t, this.httpOptions);
	}

	update(t: T, id: number): Observable<T> {
		return this.http.put<T>(`${this.baseUrl}/${id}`, t, this.httpOptions);
	}

	delete(id: number): Observable<T> {
		return this.http.delete<T>(`${this.baseUrl}/${id}`, this.httpOptions);
	}
}
