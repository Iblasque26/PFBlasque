import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { User } from '../users/modelos';
import { AlertsService } from '../../../../core/services/alerts.service';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-dialog-confirmar',
    templateUrl: './dialog-confirmar.component.html',
    styleUrl: './dialog-confirmar.component.scss',
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatButton]
})
export class DialogConfirmarComponent {
  user: User;

  constructor(
    private alertsService: AlertsService,
    public dialogRef: MatDialogRef<DialogConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.user = data;
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
    this.alertsService.showBorrado();
  }
}
