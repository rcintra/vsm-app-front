import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe(response => this.clientes = response);
  }

  enableDisable(id: number) {
    this.clienteService.changeStatusCliente(id)
      .subscribe(res => {
        this.router.navigate([''])
        .then(() => { window.location.reload(); })
      });
  }
}
