import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url+'/clientes');
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.url+'/cliente/'+id);
  }

  getCidades(): Observable<Cidade[]>{
    return this.http.get<Cidade[]>(this.url+'/cidades');
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url+'/cliente', cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url+'/cliente/'+cliente.id, cliente);
  }

  changeStatusCliente(id: number): Observable<Cliente> {
    return this.http.put<Cliente>(this.url+'/cliente/'+id, {});
  }
}
