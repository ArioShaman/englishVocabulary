import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public cards : Array<Card>;   
  public filters = {kind: ''};

  constructor() { }

  insertData(cards){
    this.cards = cards;
    // console.log(this.cards);
  }

  setFilter(kind){
    this.filters.kind = kind;
    console.log(this.filters);
  }

  resetFilter(){
    console.log(this.filters);
    this.filters.kind = '';
  }
}
