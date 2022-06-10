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

  getCidade(id: number): Observable<Cidade> {
    return this.http.get<Cidade>(this.url+'/cidade/'+id);
  }

  saveCidade(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(this.url+'/cidade', cidade);
  }

  updateCidade(cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(this.url+'/cidade/'+cidade.id, cidade);
  }
}
