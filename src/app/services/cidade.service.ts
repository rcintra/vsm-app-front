import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  url: string = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }

  getCidades(): Observable<Cidade[]>{
    return this.http.get<Cidade[]>(this.url+'/cidades');
  }

  getCidade(id: string) {
    return this.http.get(this.url+'/cidade/'+id);
  }

  saveCidade(params: any) {
    return this.http.post(this.url+'/cidade', params);
  }

  updateCidade(id: string, params: any) {
    return this.http.put(this.url+'/cidade/'+id, params);
  }
}
