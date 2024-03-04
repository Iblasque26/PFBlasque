import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component"
import { MockProvider } from "ng-mocks";
import { AuthService } from "../../auth.service";
import { SharedModule } from "../../../../shared/shared.module";
import { Validators } from "@angular/forms";

describe('LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [SharedModule, LoginComponent],
    providers: [MockProvider(AuthService)]
});

        component = TestBed.createComponent(LoginComponent).componentInstance;

    });

    it('El LoginComponent debe instanciarse correctamente', () => {
        expect(component).toBeTruthy();
    });
    it('El email y la contraseña deben ser obligatorios', () => {
        expect(component.loginForm.get('mail')?.hasValidator(Validators.required)).toBeTrue();
        expect(component.loginForm.get('password')?.hasValidator(Validators.required)).toBeTrue();
    });
    
    it ('Si el formulario es invalido los campos se deben marcar como touched', () => {
        component.loginForm.patchValue({
            mail:'',
            password:''
        })

        expect(component.loginForm.invalid).toBeTrue;

        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');

        component.onSubmit();

        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    });
}); 