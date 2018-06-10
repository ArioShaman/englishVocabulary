import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { HelperService } from './services/helper.service';
import { Card }   from './models/card';
import { CardsComponent } from './components/cards/cards.component';
import { CardAddComponent } from './components/card-add/card-add.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { MyFilterPipe } from './my-filter.pipe';
import { Filter } from './models/filter';
import { BehaviorSubject, Observable } from "rxjs";
import { SelecterComponent } from './components/selecter/selecter.component';
import { ModalComponent } from './components/modal/modal.component';
import { Angular2TokenService } from 'angular2-token';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {AuthService} from "./services/auth.service";
// import { ModalDirective } from './directives/modal.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardAddComponent,
    ColorPickerComponent,
    MyFilterPipe,
    SelecterComponent,
    ModalComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    // ModalDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      { 
        path: '',   
        redirectTo: '/cards', 
        pathMatch: 'full' },      
      {
        path: 'cards',
        component: CardsComponent
      },
      {
        path: 'cards/add',
        component: CardAddComponent
      },  
      {
        path: 'cards/add/:id',
        component: CardAddComponent
      },  
      {
        path: 'auth',
        component: AuthDialogComponent
      }             
    ]),

  ],
  providers: [
     ApiService
   , Angular2TokenService
   , AuthService
   , HelperService
   , {provide: 'navState', useValue: 'active'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
