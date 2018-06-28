import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import { DarkModeService } from "../../services/dark-mode.service";
import {Angular2TokenService} from "angular2-token";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'upper-side-bar',
  templateUrl: './upper-side-bar.component.html',
  styleUrls: ['./upper-side-bar.component.sass'],
  animations: [
    trigger('Settings', [
      state('inactive', style({
        transform: 'translateY(100%)'
      })),
      state('active',   style({
        transform: 'translateY(0%)'
      })),
      transition('inactive <=> active', animate('500ms'))
    ]),
  ]    
})
export class UpperSideBarComponent implements OnInit {
  @Input() public Settings;
  darkMode:boolean;

  constructor(
    public darkModeService:DarkModeService,
    private tokenAuthSerivce:Angular2TokenService,
    public authService:AuthService,
    private router:Router    
  ) { 
    this.darkMode = this.darkModeService.darkMode;
    this.darkModeService.darkModeChange.subscribe((value) => { 
      this.darkMode = value; 
    });
  }

  ngOnInit() {
    // this.darkMode = this.darkModeService.get();
  }


  public changeMode(){
    this.darkModeService.changeMode();
  }

  public logOut(){
    console.log('click');
    this.authService.logOutUser().subscribe(() => console.log('LogOut'));
  }
}
