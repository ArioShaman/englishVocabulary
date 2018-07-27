import { Component, OnInit } from '@angular/core';
import { DialogService } from "../../services/dialog.service";
import {  Angular2TokenService, AuthData, UserData } from "angular2-token";
import {Router} from "@angular/router";
import { Card } from '../../models/card';
import { DarkModeService } from "../../services/dark-mode.service";

@Component({
  selector: 'dialog-widget',
  templateUrl: './dialog-widget.component.html',
  styleUrls: ['./dialog-widget.component.sass']
})
export class DialogWidgetComponent implements OnInit {
  public darkMode:boolean;
  public images:Array<object>;
  public dialogState:string;// = 'open';
  public apiBase:string = 'http://localhost:3000';
  public selectedImage:any;
  public card:Card;

  constructor(public dialog: DialogService,
              public authTokenService:Angular2TokenService,
              private router:Router,
              public darkModeService:DarkModeService
  ) { 
    this.dialog.dialogStateChange.subscribe((value) => { 
      this.dialogState = value; 
    }); 
    this.dialog.activeCardChange.subscribe((value) => { 
      this.card = value; 
    });     
    this.darkModeService.darkModeChange.subscribe((value) => { 
      this.darkMode = value; 
    });     
  }

  ngOnInit() {
    this.dialogState = this.dialog.get();
    this.darkMode = this.darkModeService.get();
    this.authTokenService.get('images.json').map(res => res.json()).subscribe(
        res =>{
          for(let obj of res){
            obj["selected"] = 'inactive';
           }
          this.images = res;    
        },
        error => {
           this.router.navigate(['/auth'])
        }
    );    
    console.log(this.card); 
  }

  public close(){
    this.dialog.close();
  }

  public clearSelected():void{
    for(let image of this.images){
      image["selected"] = "inactive";
    }
  }
  public accept(){
    console.log(this.selectedImage.image);
    this.dialog.activeCard['image']['url'] = this.selectedImage.image;    
    this.close();
  }
  public activate(image):void{
    this.selectedImage = image;
    this.clearSelected();
    image.selected = 'active';
    this.selectedImage = image;
  }
}
