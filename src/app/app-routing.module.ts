import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadeFormComponent } from './components/cidade-form/cidade-form.component';
import { CidadesComponent } from './components/cidades/cidades.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'formulario', component: ClientFormComponent},
  { path: 'formulario/:id', component: ClientFormComponent},
  { path: 'cidades', component: CidadesComponent },
  { path: 'cidades/cidade-form', component: CidadeFormComponent},
  { path: 'cidades/cidade-form/:id', component: CidadeFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
