import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent implements OnInit {

  cidade: Cidade = new Cidade();

  cidades: Cidade[] = [];

  constructor(
    private cidadeService: CidadeService, 
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cidadeService.getCidades()
      .subscribe(response => this.cidades = response);

    this.activateRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if (id) {
          this.cidadeService.getCidade(id)
            .subscribe(res => this.cidade = res);
        }
      });
  }

  save(): void {
    this.cidadeService.saveCidade(this.cidade)
      .subscribe(res => {
        this.router.navigate(['cidades'])
      },
        error => console.log(error)
      );
  }

  update(): void {
    this.cidadeService.updateCidade(this.cidade)
    .subscribe(res => {
      this.router.navigate(['cidades'])
    },
     error => console.log(error)
    );
  }

}
