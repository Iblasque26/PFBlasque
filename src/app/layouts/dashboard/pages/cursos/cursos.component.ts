import { Component } from '@angular/core';
import { CursosService } from './cursos.service';
import { Curso } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CursoDialogComponent } from './components/curso-dialog/curso-dialog.component';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-cursos',
    templateUrl: './cursos.component.html',
    styleUrl: './cursos.component.scss',
    standalone: true,
    imports: [MatButton, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DatePipe]
})
export class CursosComponent {
  displayedColumns = ['id', 'cursoNombre', 'createdAt', 'acciones'];

  cursos: Curso[] = [];

  constructor(private cursosService: CursosService,
    public dialog: MatDialog) {
    this.cursosService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      }
    })
  }
  onEdit(curso: Curso) {
  if (curso.id !== undefined) {
    this.dialog.open(CursoDialogComponent, {
      data: curso,
    }).afterClosed().subscribe({
      next: (cursos) => {
        if (cursos) {
          this.cursosService.updateCursoById(curso.id as number, cursos).subscribe({
            next: (cursos) => (this.cursos = cursos),
          });
        }
      },
    });
  }
}

  onCreate(): void {
  this.dialog
    .open(CursoDialogComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (result) {
          this.cursosService.createCurso(result).subscribe({
            next: (cursos) => (
              this.cursos = cursos
            ),
          });
        }
      },
    });
}

  onDelete(id: number) {
    if (confirm('Esta seguro?')) {
      this.cursosService.deleteCursoById(id).subscribe({
        next: (cursos) => {
          this.cursos = cursos;
        }
      })
    }
  }
}
