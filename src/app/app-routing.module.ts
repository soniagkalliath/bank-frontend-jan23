import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'', component:LandingPageComponent
  },
  {
    path:'union-bank/register', component:RegisterComponent
  },
  {
    path:'union-bank/login', component:LoginComponent
  },
  {
    path:'user/dashboard', component:DashboardComponent , canActivate:[AuthGuard]
  },
  {
    path:'user/transactions', component:TransactionsComponent, canActivate:[AuthGuard]
  },
  {
    path:'**', component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
