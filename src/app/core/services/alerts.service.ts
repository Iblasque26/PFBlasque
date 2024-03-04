import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Swal, { SweetAlertOptions } from "sweetalert2";

@Injectable({providedIn: 'root'})
export class AlertsService {
private notifications$ = new Subject<SweetAlertOptions>()

constructor() {
this.notifications$.subscribe({
    next: (options) => {
        Swal.fire(options);
    }
})

}

showAlert(options: SweetAlertOptions): void {
    this.notifications$.next(options);
}

showError(message?: string): void {
    this.notifications$.next({
      icon: 'error',
      title: 'Error!',
      text: message,
    });
}

showCreado(message?: string): void {
    this.notifications$.next({
        icon: 'success',
        title: 'Usuario Agreado',
        text: 'Usuario agregado a la lista!'
    })  
}

showBorrado(message?: string): void {
    this.notifications$.next({
        icon: 'warning',
        title: 'Usuario Eliminado',
        text: 'Se ha eliminado al usuario de la lista'
    })  
}

showEditado(message?: string): void {
    this.notifications$.next({
        icon: 'info',
        title: 'Usuario Editado',
        text: 'Se ha editado la info del usuario'
    })
}
}