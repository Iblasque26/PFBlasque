import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsComponent } from './inscriptions.component';
import { adminGuard } from '../../../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[adminGuard],
    component: InscriptionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionsRoutingModule { }
