import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { CreatePageComponent } from "./create-page/create-page.component";
import { ContentGuard } from './shared/services/content.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import {LoginGuard} from './shared/services/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
      { path: 'dashboard', component: DashboardPageComponent, canActivate: [ContentGuard]},
      { path: 'create', component: CreatePageComponent, canActivate: [ContentGuard]},
      { path: '**', component: ErrorPageComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
