import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { HelperService } from '../services/helper.service';
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class CardDestroyService {
  public selectChange:Subject<Array<Card>> = new Subject<Array<Card>>(); 
  public openChange:Subject<boolean> = new Subject<boolean>();
  public selectedCards: Array<Card> = [];
  public opened:boolean = false;
  public cardIndex: any;

  constructor(public _: HelperService) { }

  clean(){
    this.selectedCards = [];
  }
  insertCard(card){
    this.selectedCards.push(card);
    this.selectChange.next(this.selectedCards);
  }
  destroyCard(card:Card){
    card.selected = 'inactive';
    this.cardIndex = this.selectedCards.indexOf(card);
    this.selectedCards.splice(this.cardIndex, 1);
    this.selectChange.next(this.selectedCards);      
  }
  getSelected(){
    return this.selectedCards;
  }
  resetSelect(){
    this.selectedCards.forEach(card =>{
      card.selected = 'inactive';
    });
    this.selectedCards = [];
    this.selectChange.next(this.selectedCards);    
  }
  open(){
    this.opened = true;
    this.openChange.next(this.opened);
  }
  close(){
    this.opened = false;
    this.openChange.next(this.opened);
  }
}
