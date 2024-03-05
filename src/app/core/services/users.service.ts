import { Injectable } from '@angular/core';
import { User } from '../../layouts/dashboard/pages/users/modelos';
import { Observable, debounce, debounceTime, delay, of, mergeMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroment } from '../../../enviroments/enviroments';
import { AlertsService } from './alerts.service';
import { Pagination } from '../models/pagination';

let USERS_DB: User[] = [];
const ROLES_DB: string[] = ['ADMIN', 'USER'];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private alertsService: AlertsService) { }

   generateString(length: number) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  getUserById(id: number | string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${enviroment.apiURL}/users/${id}`)
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB).pipe(delay(1000));
  }

  getUsers() {
    return this.httpClient.get<User[]>(`${enviroment.apiURL}/users`, {
    })
      .pipe(delay(1000))
      .pipe(catchError((error) => {
        this.alertsService.showError('Error al cargar los usuario')
        return of(error);
      }))
  }

paginate(page: number, perPage = 5) {
  return this.httpClient.get<Pagination<User>>(`${enviroment.apiURL}/users?_page=${page}&_per_page=${perPage}`)

}

  createUser(payload: User) {
    return this.httpClient.post<User>(`${enviroment.apiURL}/users`, {...payload, token: this.generateString(15)}).pipe(
      mergeMap(() => this.getUsers()));
  }

  delUser(userID: number) {
    return this.httpClient.delete<User>(`${enviroment.apiURL}/users/${userID}`)
  }

getAllUsers(): Observable<User[]> {
  return this.httpClient.get<User[]>(`${enviroment.apiURL}/users?role=USER`)
}

}
