import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms'

@Pipe({
    name: 'validationErrors',
    standalone: true
})
export class ValidationErrorsPipe implements PipeTransform {

  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {
    if (!!errors) {
      let mensajes = [];
      if (errors['required']) mensajes.push('Este campo es obligatorio')
      if (errors['email']) mensajes.push('No es un email valido')
      if (errors['minlength']) mensajes.push(`El email debe superar los ${errors['minlength']?.requiredLength} caracteres`)
      return mensajes.join('. ') + '.'
    }
    return null;
  }

}
