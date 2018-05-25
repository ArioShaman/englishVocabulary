import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Card } from '../../models/card';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass'],
  animations: [
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
export class CardsComponent implements OnInit {
  public columns = ['id','eng','rus','engSentence','rusSentence','colorHash'];
  public cards : Array<Card>; 
  public selectedCard: Card;

  constructor(public apiService: ApiService , public router : Router) {}

  
  ngOnInit() {
    this.apiService.get("cards")
    .subscribe((data : Card[])=>{
      for(let obj of data){
        obj["state"] = 'inactive';
      }
      this.cards = data;
      console.log(this.cards);
    });    
  }


  public delete(id:string){

    console.log("delete : " + id);
    var path = 'cards/' + id;
    this.apiService.delete(path).subscribe((r)=>{

    this.cards = this.cards.filter((p,i)=>{
        if(Number(id) === p.id ) 
        {
        return false;
        }
        return true;
    },this.cards)

    });

  }
  public update(id:string){
    console.log("update : " + id );
    this.router.navigateByUrl('/products/add/' + id);
  }

  public onSelect(card: Card): void {
    this.changeState(card);
    if(this.selectedCard !== card){
      this.selectedCard = card;
    }else{
      this.selectedCard = null;
    }
  }  

  public changeState(card: Card): void{
    card.state = card.state === 'active' ? 'inactive' : 'active';
  }  

}
