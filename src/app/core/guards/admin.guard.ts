import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../layouts/auth/auth.service";
import { Store } from "@ngrx/store";
import { selectAuthUser } from "../store/auth/selectors";
import { map } from "rxjs";
import { AlertsService } from "../services/alerts.service";

export const adminGuard: CanActivateFn = (route, state) => {
    const alert = inject(AlertsService)
    const router = inject(Router);
    const authService = inject(AuthService);
    const store = inject(Store);

    return store.select(selectAuthUser).pipe(
        map((user) => {
            if (user?.role === 'ADMIN') {
                return true;
            } else if (user?.role === 'USER') {
                alert.showError('No tienes permisos para ingresar a este sitio');
                return false; 
            } else {
                return router.createUrlTree(['Dashboard', 'Home']);
            }
        }),
    );
};