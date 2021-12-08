import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
// import { LoginComponent } from './core/components/login/login.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { TopoComponent } from './pages/topo/topo.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [ChildrenGuard],
    children: [
      // { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'topo', pathMatch: 'full' },
      { path: 'topo', component: TopoComponent }
    ]
  },
  // { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
