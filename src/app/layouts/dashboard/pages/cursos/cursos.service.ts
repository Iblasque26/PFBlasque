import { Injectable } from "@angular/core";
import { Curso } from "./models";
import { delay, mergeMap, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { enviroment } from "../../../../../enviroments/enviroments";

@Injectable()
export class CursosService {
    constructor(private httpClient: HttpClient) { }

    getCursos() {
        return this.httpClient.get<Curso[]>(`${enviroment.apiURL}/courses`).pipe(delay(1500));
    }

    createCurso(payload: Curso) {
        return this.httpClient.post<Curso>(`${enviroment.apiURL}/courses`, { ...payload }).pipe(
            mergeMap(() => this.getCursos())
        )

    }

    deleteCursoById(id: number) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.delete<Curso>(`${enviroment.apiURL}/courses/${id}`, { headers }).pipe(
            mergeMap(() => this.getCursos())
        );
    }

    updateCursoById(id: number, data: Curso) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.put<Curso>(`${enviroment.apiURL}/courses/${id}`, { ...data }, { headers }).pipe(
            mergeMap(() => this.getCursos())
        );
    }
}