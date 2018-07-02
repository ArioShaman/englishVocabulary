import { Component, OnInit } from '@angular/core';
import {  SharedService } from "../../services/shared.service";
import { DarkModeService } from "../../services/dark-mode.service";
// import { ApiService } from '../../api.service';
import {  AuthService } from "../../services/auth.service";
import {  Angular2TokenService, AuthData, UserData } from "angular2-token";
import {Router, ActivatedRoute} from "@angular/router";
import { Voc } from '../../models/voc';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-voc-add',
  templateUrl: './voc-add.component.html',
  styleUrls: ['./voc-add.component.sass']
})
export class VocAddComponent implements OnInit {
  public state = 'voc-add';
  public darkMode:boolean;
  public voc: Voc = new Voc();
  public colors : Array<string> = [
    'grad01',
    'grad02',
    'grad03',
    'grad04',
    'grad05',
    'grad06',
    'grad07'
  ];

  constructor(
    public shared:SharedService,
    public darkModeService:DarkModeService,
    // public authService:AuthService,
    public authTokenService:Angular2TokenService,
    private router:Router,
    private acRoute:ActivatedRoute,
    public _: HelperService
  ) {
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        });       
  }

  ngOnInit() {
    this.darkMode = this.darkModeService.get();
    this.shared.set(this.state);   

    this.acRoute.params.subscribe((data : any)=>{
      if(data && data.id){

      }
      else
      {
          this.voc = new Voc();
      }       
    });
  }

  public onSubmit(){
    console.log(this.voc);
    if(this.voc.id){

    }else{
      this.voc.color = this._.sample(this.colors);
      this.authTokenService.post("vocs", this.voc).subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['/vocs'])
        },
        error =>{
          console.log(error);
        }
      );
    }    
  }
}