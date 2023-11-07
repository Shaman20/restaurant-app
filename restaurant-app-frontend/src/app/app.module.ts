import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { QuillModule } from 'ngx-quill';
import { EditorComponent } from './components/editor/editor.component';
import { FriendsComponent } from './components/friends/friends.component';
import { MatCardModule } from '@angular/material/card';
import { AddfriendsComponent } from './components/addfriends/addfriends.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    FeedComponent,
    EditorComponent,
    FriendsComponent,
    AddfriendsComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    QuillModule,
    MatCardModule,
  ],
  providers: [SnackBarComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
