import { TestBed } from '@angular/core/testing';
import { CursosComponent } from './cursos.component';
import { CursosService } from './cursos.service';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';


describe('Pruebas de CursosComponent', () => {
    let component: CursosComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [CursosComponent],
    providers: [
        MockProvider(CursosService, {
            getCursos: () => of([{
                    id: 1,
                    cursoNombre: 'Angular',
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    cursoNombre: 'Js',
                    createdAt: new Date(),
                },
            ])
        }),
    ]
});

        component = TestBed.createComponent(CursosComponent).componentInstance;
    });

    it('Las columnas de los cursos deben ser "id", "cursoNombre", "createdAt", "acciones"', () => {
        expect(component.displayedColumns).toContain('id');
        expect(component.displayedColumns).toContain('cursoNombre');
        expect(component.displayedColumns).toContain('createdAt');
        expect(component.displayedColumns).toContain('acciones');
    });
});