import { Component, Inject, OnInit, Input, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { CardsComponent } from './components/cards/cards.component';
import { SharedService } from "./services/shared.service";
import { DarkModeService } from "./services/dark-mode.service";

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
      public darkModeService:DarkModeService) {
        this.authToken.init(environment.token_auth_config);
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        });    
  }

  onActivate(componentRef){
    // console.log(componentRef.test);
  }

  ngOnInit() {
    console.log(this.darkMode);
    setTimeout(()=> {
       // console.log(this.shared); 
      this.darkMode = this.darkModeService.get();
      this.state = this.shared.get();
       // console.log(this.state);
      },700); 
    }     


  public openMenu():void{
    this.navState = this.navState === 'active' ? 'inactive' : 'active';
  }
  public Settings():void{
    this.settings = this.settings === 'active' ? 'inactive' : 'active';;
  }
}
