import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { enviroment } from "../../../../../enviroments/enviroments";
import { Inscription, createInscriptionData } from "./models";
import { User } from "../users/modelos";
import { catchError, concatMap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class InscriptionsService {
    constructor(private http: HttpClient) { }

    getInscriptions() {
        return this.http.get<Inscription[]>(`${enviroment.apiURL}/inscriptions?_embed=user&_embed=course`);
    }

    getInscriptionsById(userId: string | number) {
        return this.http.get<User>(`${enviroment.apiURL}/users/${userId}`)
        .pipe(concatMap((user) => this.http.get(`${enviroment.apiURL}/inscriptions?userId=${user.id}`)
        ),
        catchError((error) => {
            alert('Ocurrio un error')
            return throwError(() => error);
        })
        )
    }

    createInscription(data: createInscriptionData) {
        return this.http.post<Inscription>(`${enviroment.apiURL}/inscriptions`, data);
    }
}