import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from './nombre-completo.pipe';
import SizeLetraDirective from './size-letra.directive';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ValidationErrorsPipe } from './validation-errors.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        NombreCompletoPipe,
        SizeLetraDirective,
        ValidationErrorsPipe
    ],
    exports: [
        NombreCompletoPipe,
        SizeLetraDirective,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        ValidationErrorsPipe,
        MatPaginatorModule
    ]
})
export class SharedModule { }
