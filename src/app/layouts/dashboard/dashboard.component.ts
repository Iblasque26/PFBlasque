import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatDrawerContainer, MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './pages/users/modelos';
import { selectAuthUser } from '../../core/store/auth/selectors';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [MatDrawerContainer, MatDrawer, MatNavList, MatListItem, RouterLinkActive, RouterLink, MatToolbar, MatIconButton, MatIcon, RouterOutlet, CommonModule]
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService, private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser)
  }

  logout(): void {
    this.authService.logout();
  }
}
