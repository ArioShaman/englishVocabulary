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
import {SharedService} from "./services/shared.service";
import { CardsBarComponent } from './components/cards-bar/cards-bar.component';
import { CardsService } from "./services/cards.service";
import { VocsComponent } from './components/vocs/vocs.component';
import { VocsBarComponent } from './components/vocs-bar/vocs-bar.component';
import { UpperSideBarComponent } from './components/upper-side-bar/upper-side-bar.component';
import { DarkModeService } from "./services/dark-mode.service";
// import { ModalDirective } from './directives/modal.directive';

import { Ng2CacheModule } from 'ng2-cache';
import { VocAddComponent } from './components/voc-add/voc-add.component';

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
    CardsBarComponent,
    VocsComponent,
    VocsBarComponent,
    UpperSideBarComponent,
    VocAddComponent,
    // ModalDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2CacheModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      { 
        path: '',   
        redirectTo: '/vocs', 
        pathMatch: 'full',      
      },
      {
        path: 'vocs/:id/cards',
        component: CardsComponent
      },
      {
        path: 'vocs',
        component: VocsComponent
      },      
      {
        path: 'vocs/:voc-id/cards/add',
        component: CardAddComponent
      },  
      {
        path: 'vocs/:voc-id/cards/add/:id',
        component: CardAddComponent
      },  
      {
        path: 'vocs/add',
        component: VocAddComponent
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
   , SharedService
   , HelperService
   , CardsService
   , DarkModeService
   , {provide: 'navState', useValue: 'active'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
