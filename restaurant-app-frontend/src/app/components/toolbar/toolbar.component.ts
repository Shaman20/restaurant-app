import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logoutService/logout.service';
import { EditorComponent } from '../editor/editor.component';
import { FriendsComponent } from '../friends/friends.component';
import { AddfriendsComponent } from '../addfriends/addfriends.component';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  isLoggedIn = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private logoutService: LogoutService,
    private snackBar: SnackBarService
  ) {}

  isLoggedOut() {
    return !this.authService.isLoggedIn;
  }

  openSignupDialog(): void {
    if (!this.isLoggedOut()) {
      this.dialog
        .open(EditorComponent, {
          width: '50%',
        })
        .afterClosed()
        .subscribe((result) => {});
    } else {
      this.dialog
        .open(SignupComponent)
        .afterClosed()
        .subscribe((result) => {});
    }
  }

  openLoginDialog(): void {
    if (!this.isLoggedOut()) {
      this.logout();
    } else {
      this.dialog
        .open(LoginComponent)
        .afterClosed()
        .subscribe((result) => {});
    }
  }

  openAddFriendsDialog(): void {
    if (!this.isLoggedOut()) {
      this.dialog
        .open(AddfriendsComponent, {
          position: { top: '0', right: '0' },
          width: '400px',
          height: '100%',
        })
        .afterClosed()
        .subscribe((result) => {});
    }
  }

  openViewFriendsDialog(): void {
    if (!this.isLoggedOut()) {
      this.dialog
        .open(FriendsComponent, {
          position: { top: '0', right: '0' },
          width: '400px',
          height: '100%',
        })
        .afterClosed()
        .subscribe((result) => {});
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logout(): void {
    this.logoutService.logout().subscribe(() => {
      // Clear the user token from local storage
      localStorage.removeItem('token');
      // Set the isLoggedIn property in AuthService to false
      this.authService.setLoggedInState(false);
      // Navigate back to the home screen or the appropriate route
      this.router.navigate(['']);
      this.snackBar.openSuccessSnackbar('Logged out successfully', 'Close');
    });
  }
}
