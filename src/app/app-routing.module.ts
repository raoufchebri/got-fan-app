import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './views/pages/search/search.component';
import { LoginComponent } from './views/pages/login/login.component';
import { DetailComponent } from './views/pages/detail/detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: SearchComponent},
  { path: 'login', component: LoginComponent, data: {animation: 'isLeft'}},
  { path: 'detail/:type/:id', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
