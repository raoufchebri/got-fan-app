import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { SearchComponent } from './views/pages/search/search.component';
import { DetailComponent } from './views/pages/detail/detail.component';
import { MenuComponent } from './views/components/menu/menu.component';
import { SearchBarComponent } from './views/components/search-bar/search-bar.component';
import { SearchResultComponent } from './views/components/search-result/search-result.component';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { FavoriteComponent } from './views/pages/favorite/favorite.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Ngrx Store
import { reducers } from './app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ItemEffects } from './core/effects/item.effects.';
import { AuthEffects } from './core/auth/effects/auth.effects';

//Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth/';
import { AngularFireStorageModule } from '@angular/fire/storage/';
import { UserEffects } from './core/auth/effects/user.effects';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    DetailComponent,
    MenuComponent,
    SearchBarComponent,
    SearchResultComponent,
    NotFoundComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    StoreModule.forRoot(reducers),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      ItemEffects,
      AuthEffects,
      UserEffects
    ]),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
