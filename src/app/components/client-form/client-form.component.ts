import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  cliente: Cliente = new Cliente();

  cidades: Cidade[] = [];

  constructor(
    private clienteService: ClienteService, 
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getCidades()
      .subscribe(response => this.cidades = response);

    this.activateRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if (id) {
          this.clienteService.getCliente(id)
            .subscribe(res => this.cliente = res);
        }
      });
  }

  save() {
    this.clienteService.saveCliente(this.cliente)
      .subscribe(res => {
        this.router.navigate([''])
      },
        error => console.log(error)
      );
  }

  update() {
    this.clienteService.updateCliente(this.cliente)
      .subscribe(res => {
        this.router.navigate([''])
      },
       error => console.log(error)
      );
  }

  compararCidade(c1: Cidade, c2: Cidade): boolean {
    if (c1 === undefined && c2 === undefined) return true;
    return c1 === null || c2 === null || c1 === undefined || c2 === undefined ? false : c1.id == c2.id;
  }
}
