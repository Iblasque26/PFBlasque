import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { User } from './modelos/index';
import { MatDialog } from '@angular/material/dialog';
import { AbmDialogComponent } from '../abm-dialog/abm-dialog.component';
import { DialogConfirmarComponent } from '../dialog-confirmar/dialog-confirmar.component';
import { UsersService } from '../../../../core/services/users.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { ActivatedRoute, RouterLinkActive, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { NombreCompletoPipe } from '../../../../shared/nombre-completo.pipe';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: true,
    imports: [MatButton, MatIcon, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, RouterLinkActive, RouterLink, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, NombreCompletoPipe]
})
export class UsersComponent implements OnInit {
  cursos = ['Angular', 'Js', 'Html', 'React'];
  displayedColumns: string[] = ['id', 'nombreCompleto', 'mail', 'provincia', 'curso', 'rol', 'acciones'];
  dataSource: User[] = [];
  roles: string[] = [];

  totalItems = 0;
  pagesize = 5;
  currentPage = 1;

  isEditing = false;
  constructor(
    private usersService: UsersService,
    private matDialog: MatDialog,
    private alertsService: AlertsService,
  ) { }

  openUsersDialog(): void {
    this.matDialog.open(AbmDialogComponent).afterClosed().subscribe((v: User) => {
      if (v) {
        const newUser: User = {
          ...v,
        };
        this.usersService.createUser(newUser).subscribe(() => {
          this.alertsService.showCreado();
          this.refreshUsers();
        });
      }
    });
  }

  refreshUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      }
    });
  }

  ngOnInit(): void {
    this.getPageData();
  }

  onPage(ev: PageEvent) {
    this.currentPage = ev.pageIndex + 1;
    this.usersService.paginate(this.currentPage, ev.pageSize).subscribe({
      next: (paginateResult) => {
        this.totalItems = paginateResult.items;
        this.dataSource = paginateResult.data;
        this.pagesize = ev.pageSize;
      }
    })
  }

  getPageData(): void {
    forkJoin([
      this.usersService.getRoles(),
      this.usersService.paginate(this.currentPage)
    ]).subscribe({
      next: (value) => {
        this.roles = value[0];
        const paginationResult = value[1];
        this.totalItems = paginationResult.items;
        this.dataSource = paginationResult.data;
      }
    })
  }

  onEditUser(user: User): void {
    this.isEditing = true;
    this.matDialog
      .open(AbmDialogComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (v: User) => {
          if (!!v) {
            this.dataSource = this.dataSource.map((u) =>
              u.id === user.id ? { ...u, ...v } : u
            );
            if (this.isEditing) {
              this.alertsService.showEditado();
            }
          }
        },
      });
  }

  abrirElimDialog(user: User): void {
    const dialogRef = this.matDialog.open(DialogConfirmarComponent, {
      width: '350px',
      data: user
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        if (user.id !== undefined) {
          this.usersService.delUser(user.id).subscribe(() => {
            this.refreshUsers();
          });
        } else {
          console.error("El ID del usuario es undefined");
        }
      }
    });
  }

}