import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        LoginComponent
    ]
})
export class AuthModule { }
