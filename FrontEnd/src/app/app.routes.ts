import { Routes } from '@angular/router';
import { SignupComponent } from './components/paths/signup/signup.component';
import { RegisterComponent } from './components/paths/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LeaderboardComponent } from './components/pages/leaderboard/leaderboard.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'board', component: LeaderboardComponent },
  { path: '**', component: NotFoundComponent },
];
