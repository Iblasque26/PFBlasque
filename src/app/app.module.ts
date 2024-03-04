import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { AbmDialogComponent } from './layouts/dashboard/pages/abm-dialog/abm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { DialogConfirmarComponent } from './layouts/dashboard/pages/dialog-confirmar/dialog-confirmar.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule, MatSelectTrigger } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './core/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        DashboardModule,
        MatOptionModule,
        MatSelectTrigger,
        MatPaginatorModule,
        MatPaginator,
        MatButtonModule,
        MatFormField,
        MatSelectModule,
        HttpClientModule,
        AbmDialogComponent,
        DialogConfirmarComponent,
        StoreModule.forRoot(appReducers, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot([])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }