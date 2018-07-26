import { Component, OnInit } from '@angular/core';
import {  SharedService } from "../../services/shared.service";
import { DarkModeService } from "../../services/dark-mode.service";
import { ApiService } from '../../api.service';
import {  AuthService } from "../../services/auth.service";
import { DialogService } from "../../services/dialog.service";
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
  public apiBase:string = 'http://localhost:3000';

  constructor(public apiService: ApiService,
              public shared:SharedService,
              public darkModeService:DarkModeService,
              // public authService:AuthService,
              public authTokenService:Angular2TokenService,
              private router:Router,
              public dialog: DialogService                
    ){
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        });   
        this.dialog.dialogStateChange.subscribe((value) => { 
          this.dialogState = value; 
        });         
    }

  ngOnInit() {
    this.darkMode = this.darkModeService.get();
    this.shared.set(this.state);   
    this.dialogState = this.dialog.get();
    this.currentUser = this.authTokenService.currentUserData;

    this.authTokenService.get('vocs.json').map(res => res.json()).subscribe(
        res =>{
          for(let obj of res){
            obj["state"] = 'inactive';
          }
          this.vocs = res;
          console.log(this.vocs);
          // this.shared.set(this.state);     
        },
        error => {
           this.router.navigate(['/auth'])
        }
    );       
    // console.log(this.currentUser);
    
  }

  public selectCover(id):void{
    this.dialog.open(id);
  }
}
