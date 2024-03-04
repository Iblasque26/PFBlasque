import { Pipe, PipeTransform } from '@angular/core';

export interface usuarioPipe {
  nombre: string;
  apellido: string;
}

@Pipe({
    name: 'nombreCompleto',
    standalone: true
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: usuarioPipe, ...args: unknown[]): unknown {
    return value.nombre + ' ' + value.apellido;
  }

}
