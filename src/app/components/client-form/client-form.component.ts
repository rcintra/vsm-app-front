import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  cidades: Cidade[] = [];
  id!: string;
  form!: FormGroup;
  isAddMode!: boolean;  
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService, 
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  
    this.clienteService.getCidades()
      .subscribe(response => this.cidades = response);

    this.activateRoute.params
      .subscribe(params => {
        this.id = params['id'];
        this.isAddMode = !this.id;
        if (this.id) {  
          this.clienteService.getCliente(this.id)
            .pipe(first())
            .subscribe(res => this.form.patchValue(res));
        }
      });

      this.form = this.fb.group({
        nome: ['', Validators.required],
        cpfCnpj: [{value:'', disabled:!this.isAddMode}, Validators.required],
        endereco: [''],
        numero: [''],
        bairro: [''],
        cep: [''],
        telefone: [''],
        email: ['', Validators.email],
        cidade: ['']
      });
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.save();
    } else {
      this.update();
    }

  }

  save() {
    this.clienteService.saveCliente(this.form.value)
      .subscribe(res => {
        this.router.navigate([''])
      },
        error => console.log(error)
      );
  }

  update() {
    this.clienteService.updateCliente(this.id, this.form.value)
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
