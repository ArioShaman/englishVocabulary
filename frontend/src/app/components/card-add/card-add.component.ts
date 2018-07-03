import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import { Router } from '@angular/router';

import { ApiService } from '../../api.service';
import { HelperService } from '../../services/helper.service';
import {  AuthService } from "../../services/auth.service";
import {  Angular2TokenService, AuthData, UserData } from "angular2-token";
import { DarkModeService } from "../../services/dark-mode.service";

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.sass', '../app/../cards/cards.component.sass'],
  animations: [
    trigger('colorState', [
      state('inactive', style({
        width: '0px'
      })),
      state('active',   style({
        width: '300px  '
      })),
      transition('inactive => active', animate('500ms')),
      transition('active => inactive', animate('500ms')),
    ]),  
    trigger('cardState', [
      state('inactive', style({
        transform: 'rotateY(0deg)'
      })),
      state('active',   style({
        transform: 'rotateY(180deg)'
      })),
      transition('inactive => active', animate('700ms')),
      transition('active => inactive', animate('700ms')),
    ]),       
  ]  

})
export class CardAddComponent implements OnInit {

  public card : Card  = new Card();
  public colors = ["#A3FF8A", "#94CCFF", "#C55E59", "#FC8A40" , "#40FCB4", "#B767D0"];
  public colorState = 'inactive';
  public cardState  = 'inactive';
  public selectedColor = null; 
  public filters = {kind: ''};  
  public kinds : Array<any>;
  public darkMode:boolean;
  public vocId:number;

  constructor(public apiService: ApiService ,
    public acRoute : ActivatedRoute,
    public router: Router,
    public authTokenService:Angular2TokenService,
    public darkModeService:DarkModeService,
    public _: HelperService) { 
      this.darkModeService.darkModeChange.subscribe((value) => { 
        this.darkMode = value; 
      });  
  }

  ngOnInit() {
    this.darkMode = this.darkModeService.get();    
    this.getKinds();   
    this.acRoute.params.subscribe((data : any)=>{
      if(data && data.id){
          // this.apiService.get("cards/"+data.id).subscribe((data : Card)=>{
          //   this.card = data;
          //   this.filters.kind = this._.find(this.kinds, function(obj){return obj.id == data.kind_id}).name;
          // });
      }
      else
      {
          this.card = new Card();
          console.log(this.card);
      }
    }) 
  }

  public getKinds(){
    this.authTokenService.get("kinds").subscribe((data: any)=>{
      this.kinds = data;
    })          
  } 
   
  public onSubmit(){
    this.authTokenService.get("kinds").subscribe((data:any)=>{
      this.kinds = data;
      this.kinds = JSON.parse(this.kinds['_body']);
      var selected = this.filters.kind;
      var obj = this._.find(this.kinds, function(obj){
        return obj.name == selected}
      );
      this.card.kind_id = obj.id; 
      if(this.card.id){
        // this.apiService.update("cards/"+this.card.id, this.card).subscribe((r)=>{
        //   window.location.href = '/';
        // })
      }
      else{
        this.acRoute.params.subscribe((data : any)=>{
          this.vocId = data['voc-id'];
          this.authTokenService.post("vocs/"+this.vocId+"/cards",this.card).subscribe((r)=>{
            this.card = new Card();
            this.router.navigate(['/vocs/'+ this.vocId+'/cards']);
          });
        });
      }
    });  
  }

  public selectColor(color){
    this.selectedColor = color;
    this.card.colorHash = color;
    console.log(this.filters.kind);
  }

  public changeState(): void{
    this.colorState = this.colorState === 'active' ? 'inactive' : 'active';
  }  
  public changeCardState(): void{
    this.cardState = this.cardState === 'active' ? 'inactive' : 'active';     
  }
}
