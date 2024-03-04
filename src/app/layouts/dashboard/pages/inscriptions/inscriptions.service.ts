import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { enviroment } from "../../../../../enviroments/enviroments";

@Injectable({ providedIn: 'root' })
export class InscriptionsService {
    constructor(private http: HttpClient) { }

    getInscriptions() {
        return this.http.get(`${enviroment.apiURL}/inscriptions?_embed=user&_embed=product`)
    }
}