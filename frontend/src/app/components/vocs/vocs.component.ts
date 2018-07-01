import { Component, OnInit } from '@angular/core';
import {  SharedService } from "../../services/shared.service";
import { DarkModeService } from "../../services/dark-mode.service";
import { ApiService } from '../../api.service';
import {  AuthService } from "../../services/auth.service";
import {  Angular2TokenService, AuthData, UserData } from "angular2-token";
import {Router} from "@angular/router";

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
  constructor(public apiService: ApiService,
              public shared:SharedService,
              public darkModeService:DarkModeService,
              // public authService:AuthService,
              public authTokenService:Angular2TokenService,
              private router:Router                  
    ){
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        });   
    }

  ngOnInit() {
    this.darkMode = this.darkModeService.get();
    this.shared.set(this.state);   
    this.currentUser = this.authTokenService.currentUserData;

    // this.apiService.get("vocs")
    // .subscribe((data : Array<any>)=>{
    //   for(let obj of data){
    //     obj["state"] = 'inactive';
    //   }
    //   this.vocs = data;
    //   console.log(this.vocs);
    //   // this.shared.set(this.state);     
    // }); 
    this.authTokenService.get('vocs.json').map(res => res.json()).subscribe(
        res =>{
          for(let obj of res){
            obj["state"] = 'inactive';
          }
          this.vocs = res;
          console.log(this.vocs);
        },
        error => {
           this.router.navigate(['/auth'])
        }
    );       
    // console.log(this.currentUser);
    
  }

}
