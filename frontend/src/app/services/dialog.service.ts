import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { CacheService, CacheStoragesEnum } from 'ng2-cache';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public dialogState:string;
  public dialogStateChange: Subject<string> = new Subject<string>();
  
  public activeCard:Card;
  public activeCardChange: Subject<Card> = new Subject<Card>();

  constructor(private cache: CacheService) { 
      this.dialogState = 'close';
  }

  public get(){
    return this.dialogState;
  }

  public open(card){
    this.dialogState = 'open';
    this.dialogStateChange.next(this.dialogState);
    
    this.activeCard = card;
    this.activeCardChange.next(this.activeCard);
  }

  public close(){
    this.dialogState = 'close';
    this.dialogStateChange.next(this.dialogState);
  }

}
