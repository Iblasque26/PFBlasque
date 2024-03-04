import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../auth.service';
import { ValidationErrorsPipe } from '../../../../shared/validation-errors.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatIconButton, MatSuffix, MatIcon, MatButton, ValidationErrorsPipe]
})
export class LoginComponent {
loginForm: FormGroup;

showPassword = false;

constructor(private fb: FormBuilder, private authService: AuthService) {
  this.loginForm = this.fb.group({
    mail: this.fb.control('', [Validators.email, Validators.required, Validators.minLength(3)]),
    password: this.fb.control('', [Validators.required]),
  });
}

onSubmit(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
  } else {
    this.authService.login(this.loginForm.value).subscribe()
  }
}
}
