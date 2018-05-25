import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Card } from '../../models/card';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.sass'],
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


  constructor(public apiService: ApiService , public acRoute : ActivatedRoute) { }

  ngOnInit() {
    this.acRoute.params.subscribe((data : any)=>{
    if(data && data.id){
        this.apiService.get("cards/"+data.id).subscribe((data : Card)=>{
        this.card = data;
        });
    }
    else
    {
        this.card = new Card();
    }
    })  
  }

  public onSubmit(){
      if(this.card.id){
      this.apiService.update("cards/"+this.card.id, this.card).subscribe((r)=>{
        window.location.href = '/';
      })
      }
      else
        this.apiService.post("cards",this.card).subscribe((r)=>{
        this.card = new Card();
        window.location.href = '/';
      });
  }

  public selectColor(color){
    this.selectedColor = color;
    this.card.colorHash = color;
  }

  public changeState(): void{
    this.colorState = this.colorState === 'active' ? 'inactive' : 'active';
  }  
  public changeCardState(): void{
    this.cardState = this.cardState === 'active' ? 'inactive' : 'active';
  }
}
