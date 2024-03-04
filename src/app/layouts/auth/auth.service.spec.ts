import { TestBed } from "@angular/core/testing";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { User } from "../dashboard/pages/users/modelos";
import { Store, StoreModule } from '@ngrx/store'; // Importa StoreModule

describe('Pruebas del AuthService', () => {
    let authService: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
            imports: [HttpClientTestingModule, StoreModule.forRoot({})] // Agrega StoreModule.forRoot({})
        });

        authService = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('AuthService debe estar definido', () => {
        expect(authService).toBeTruthy();
    });

    it('Al llamar login() debe establecer un authUser', () => {
        const MOCK_RESPONSE: User[] = [{
            id: 56,
            nombre: 'Mock',
            apellido: 'MockApellido',
            mail: 'mock@mail.com',
            provincia: 'MockBsAs',
            curso: [''],
            password: 'mockpass',
            role: 'ADMIN',
            token: 'MOCKABC',
        }];

        authService.login({mail: 'mock@mail.com', password: 'mockpass'}).subscribe({
            next: () => {
                expect(authService.authUser).toBeTruthy();
            }
        });
       
        httpController.expectOne({
            url: 'http://localhost:3000/users?mail=mock@mail.com&password=mockpass',
            method: 'GET',
        }).flush(MOCK_RESPONSE);
    });
});