import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { CursosService } from '../cursos/cursos.service';



@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionsRoutingModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects]),
  ],
  providers: [CursosService]
})
export class InscriptionsModule { }
