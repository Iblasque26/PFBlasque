import { Injectable } from '@angular/core'
import { User } from '../dashboard/pages/users/modelos'
import { Router } from '@angular/router'
import { AlertsService } from '../../core/services/alerts.service';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { enviroment } from '../../../enviroments/enviroments';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/store/auth/actions';



interface LoginData {
    mail: null | string;
    password: null | string;
}

const MOCK_USER = {
    id: 52,
    mail: 'test@mail.com',
    nombre: 'fakename',
    apellido: 'fakelastname',
    provincia: 'Messi',
    curso: [''],
    password: '123456'
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    authUser: User | null = null;
    constructor(
        private router: Router,
        private alertsService: AlertsService,
        private httpClient: HttpClient,
        private store: Store) { }
    private setAuthUser(user: User): void {
        this.authUser = user;
        this.store.dispatch(AuthActions.setAuthUser({ user }))
        localStorage.setItem(
            'token',
            user.token
        );
    }

    login(data: LoginData): Observable<User[]> {
        return this.httpClient.get<User[]>(`${enviroment.apiURL}/users?mail=${data.mail}&password=${data.password}`)
            .pipe(
                tap((response) => {
                    if (!!response[0]) {
                        this.setAuthUser(response[0]);
                        this.router.navigate(['dashboard', 'home']);
                    } else {
                        this.alertsService.showError('Email o contraseña incorrectos')
                    }
                })
            )
    }

    logout(): void {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['auth', 'login']);
        localStorage.removeItem('token');
    }

    verifyToken() {
        return this.httpClient.get<User[]>(`${enviroment.apiURL}/users?token=${localStorage.getItem('token')}`).pipe(
            map((response) => {
                if (response.length) {
                    this.setAuthUser(response[0]);
                    return true;
                } else {
                    this.store.dispatch(AuthActions.logout());
                    localStorage.removeItem('token');
                    return false
                }
            }),
            catchError(() => of(false))
        )
    }
}
