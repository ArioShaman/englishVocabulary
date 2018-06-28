import { Component, Inject, OnInit, Input, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { CardsComponent } from './components/cards/cards.component';
import { SharedService } from "./services/shared.service";
import { DarkModeService } from "./services/dark-mode.service";
import { CacheService, CacheStoragesEnum } from 'ng2-cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})

export class AppComponent {
  public state:String;
  public settings:String = 'inactive';
  public darkMode:boolean;

  constructor(@Inject('navState') public navState:string,
      private authToken: Angular2TokenService,
      public shared:SharedService,
      public darkModeService:DarkModeService,
      private cache: CacheService) {
        this.authToken.init(environment.token_auth_config);
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        }); 
        this.shared.varChange .subscribe((value) => {
          this.state = value;
        }); 
        if(this.cache.get('navState')){
          this.navState = this.cache.get('navState');
        }else{
          this.navState = 'inactive';
          this.cache.set('navState', 'inactive');
        }
  }

  ngOnInit() {
    setTimeout(()=> {
      this.darkMode = this.darkModeService.get();
      this.state = this.shared.get();
    },700); 
   }     


  public openMenu():void{
    this.navState = this.navState === 'active' ? 'inactive' : 'active';
    this.cache.set('navState', this.navState);
    console.log(this.cache.get('navState'));
  }
  public Settings():void{
    this.settings = this.settings === 'active' ? 'inactive' : 'active';;
  }
}
