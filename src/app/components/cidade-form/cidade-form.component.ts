import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent implements OnInit {

  cidades: Cidade[] = [];
  id!: string;
  form!: FormGroup;
  isAddMode!: boolean;  
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cidadeService: CidadeService, 
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: ['', Validators.required]
    });
    
    this.cidadeService.getCidades()
      .subscribe(response => this.cidades = response);

    this.activateRoute.params
      .subscribe(params => {
        this.id = params['id'];
        this.isAddMode = !this.id;
        if (this.id) {          
          this.cidadeService.getCidade(this.id)
            .subscribe(res => this.form.patchValue(res));
        }
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

  save(): void {
    this.cidadeService.saveCidade(this.form.value)
      .subscribe(res => {
        this.router.navigate(['cidades'])
      },
        error => console.log(error)
      );
  }

  update(): void {
    this.cidadeService.updateCidade(this.id, this.form.value)
    .subscribe(res => {
      this.router.navigate(['cidades'])
    },
     error => console.log(error)
    );
  }

}
