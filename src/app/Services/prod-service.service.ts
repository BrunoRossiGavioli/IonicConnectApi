import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../Model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdServiceService {

  url = 'https://localhost:44334/api/Produto';

  httpOptions = { header: new HttpHeaders({ 'Content-Type' : 'application/json'})};

  constructor(private http: HttpClient) { }

  getOne(id: string){
    return this.http.get(this.url + '/' + id).toPromise();
  }

  getAll(){
    return this.http.get(this.url).toPromise();
  }

  post(Prod: Produto){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.url,JSON.stringify(Prod), httpOptions).toPromise();
  }

  put(id: string, prod: Produto){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.url + '/' + id, JSON.stringify(prod), httpOptions).toPromise();
  }

  delete(id: string){
    return this.http.delete(this.url + '/' + id).toPromise();
  }

}
