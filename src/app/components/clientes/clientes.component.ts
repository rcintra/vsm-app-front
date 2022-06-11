import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  allClientes: Cliente[] = [];
  searchTerm: string = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe((response: Cliente[]) => {
        this.clientes = response;
        this.allClientes = response;
      });
  }

  enableDisable(id: any) {
    this.clienteService.changeStatusCliente(id)
      .subscribe(res => {
        this.router.navigate([''])
        .then(() => { window.location.reload(); })
      });
  }

  search(value: string): void {
    this.clientes = this.allClientes.filter((val) => 
      val.nome.toLowerCase().includes(value.toLowerCase())
    );
  }
}
