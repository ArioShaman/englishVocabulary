import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { HelperService } from './services/helper.service';
import { Card } from './models/card';
import { CardsComponent } from './components/cards/cards.component';
import { CardAddComponent } from './components/card-add/card-add.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { MyFilterPipe } from './my-filter.pipe';
import { BehaviorSubject, Observable } from "rxjs";
import { SelecterComponent } from './components/selecter/selecter.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardAddComponent,
    ColorPickerComponent,
    MyFilterPipe,
    SelecterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
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
    ]),

  ],
  providers: [ApiService, HelperService, {provide: 'navState', useValue: 'active'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
