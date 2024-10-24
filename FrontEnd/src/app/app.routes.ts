import { Routes } from '@angular/router';
import { SignupComponent } from './components/paths/signup/signup.component';
import { RegisterComponent } from './components/paths/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
];
