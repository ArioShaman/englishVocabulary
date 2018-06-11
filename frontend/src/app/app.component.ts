import { Component, Inject, OnInit, Input, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { CardsComponent } from './components/cards/cards.component';
import {  SharedService } from "./services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('navState', [
      state('inactive', style({
        width: '50px',
        minWidth: '50px',
        maxWidth: '50px'

      })),
      state('active',   style({
        width: '200px',
        minWidth: '200px',
        maxWidth: '200px'        
      })),
      transition('inactive => active', animate('500ms')),
      transition('active => inactive', animate('500ms')),
      transition('* => void', [
        animate(200, style({width: '0px'}))
      ])      
    ]),   
  ]  

})

export class AppComponent {
  public state:String;


  constructor(@Inject('navState') public navState:string,
      private authToken: Angular2TokenService,
      public shared:SharedService) {
    // console.log(navState);
    this.authToken.init(environment.token_auth_config);
    // this.authMode = 'main';
  }

  onActivate(componentRef){
    console.log(componentRef.test);
  }

  ngOnInit() {
    setTimeout(()=> {
       console.log(this.shared); 
       this.state = this.shared.get();
       console.log(this.state);
      },700); 
    }     


  public openMenu():void{
    this.navState = this.navState === 'active' ? 'inactive' : 'active';
    console.log(this.navState);
    console.log(this.shared);  
  }
}
