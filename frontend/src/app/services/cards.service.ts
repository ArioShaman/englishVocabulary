import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { HelperService } from '../services/helper.service';
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public cards : Array<Card>;   
  public filters = {kind: ''};
  public cardChange:Subject<Array<Card>> = new Subject<Array<Card>>(); 
  constructor(public _: HelperService) { }

  public insertData(cards){
    this.cardChange.next(cards);
    this.cards = cards;
    // console.log(this.cards);
  }

  public getCards(){
    return this.cards;
  }

  setFilter(kind){
    this.filters.kind = kind;
    // console.log(this.filters);
  }

  resetFilter(){
    // console.log(this.filters);
    this.filters.kind = '';
  }
}
