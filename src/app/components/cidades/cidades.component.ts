import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css']
})
export class CidadesComponent implements OnInit {

  cidades: Cidade[] = [];

  constructor(
    private cidadeService: CidadeService,
    private router: Router) { }

    ngOnInit(): void {
      this.cidadeService.getCidades()
        .subscribe(response => this.cidades = response);
    }

}
