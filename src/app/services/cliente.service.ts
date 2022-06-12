import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cidade } from '../models/cidade';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = environment.apiUrl+'/api';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url+'/clientes');
  }

  getCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.url+'/cliente/'+id);
  }

  getCidades(): Observable<Cidade[]>{
    return this.http.get<Cidade[]>(this.url+'/cidades');
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url+'/cliente', cliente);
  }

  updateCliente(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url+'/cliente/'+id, cliente);
  }

  changeStatusCliente(id: number): Observable<Cliente> {
    return this.http.put<Cliente>(this.url+'/cliente/status/'+id, {});
  }
}
