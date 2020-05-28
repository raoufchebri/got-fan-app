import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './views/pages/search/search.component';
import { LoginComponent } from './views/pages/login/login.component';
import { DetailComponent } from './views/pages/detail/detail.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { FavoriteComponent } from './views/pages/favorite/favorite.component';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], children: [
    { path: 'search', component: SearchComponent},
    { path: 'detail/:type/:id', component: DetailComponent},
    { path: 'favorite', component: FavoriteComponent},
    { path: '', redirectTo: 'search', pathMatch: 'full'},
  ]},
  { path: 'login', component: LoginComponent, data: {animation: 'isLeft'}},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
