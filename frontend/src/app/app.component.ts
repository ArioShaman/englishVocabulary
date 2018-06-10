import { Component, Inject } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { HttpClient } from '@angular/common/http';
// import { GlobalVariable } from 'globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('navState', [
      state('inactive', style({
        width: '50px'
      })),
      state('active',   style({
        width: '200px  '
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
  // public title = 'app';
  // public navState = 'active';

  constructor(@Inject('navState') public navState:string, private authToken: Angular2TokenService) {
    // console.log(navState);
    this.authToken.init(environment.token_auth_config);
  }

  public openMenu():void{
    this.navState = this.navState === 'active' ? 'inactive' : 'active';
    // this.naveState = this.navState === 'active' ? 'inactive' : 'active';
    console.log(this.navState);
  }
}
