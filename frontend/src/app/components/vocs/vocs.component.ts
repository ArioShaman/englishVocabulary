import { Component, OnInit } from '@angular/core';
import {  SharedService } from "../../services/shared.service";
import { DarkModeService } from "../../services/dark-mode.service";
import { ApiService } from '../../api.service';
import {  AuthService } from "../../services/auth.service";
import {  Angular2TokenService, AuthData, UserData } from "angular2-token";

@Component({
  selector: 'app-vocs',
  templateUrl: './vocs.component.html',
  styleUrls: ['./vocs.component.sass']
})
export class VocsComponent implements OnInit {
  public state = 'vocs';
  public darkMode:boolean;
  public currentUser:any;
  public vocs:Array<any>;
  public gradients:Array<String> = [
    'linear-gradient(to top right, #EF3131, #4E36E0)',
    'linear-gradient(to top right, #39E036, #EFD031)',
    'linear-gradient(to top right, #31E3EF, #B436E0)',
    'linear-gradient(to top right, #EFE731, #E03636)',
    'linear-gradient(to top right, #EF8C31, #36E047)',
    'linear-gradient(to top right, #36ADE0, #31EF9F)',
    'linear-gradient(to top right, #EF8C31, #E92B7B)'
  ]
  constructor(public apiService: ApiService,
              public shared:SharedService,
              public darkModeService:DarkModeService,
              public authService:AuthService,
              public authTokenService:Angular2TokenService
    ){
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        });    
        this.authTokenService.init();
    }

  ngOnInit() {
    this.darkMode = this.darkModeService.get();
    this.shared.set(this.state);   
    this.currentUser = this.authTokenService.currentUserData;

    this.apiService.get("vocs")
    .subscribe((data : Array<any>)=>{
      for(let obj of data){
        obj["state"] = 'inactive';
      }
      this.vocs = data;
      console.log(this.vocs);
      // this.shared.set(this.state);     
    });    
    // console.log(this.currentUser);
    
  }

}
