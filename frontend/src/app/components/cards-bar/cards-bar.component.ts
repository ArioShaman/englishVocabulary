import { Component, OnInit } from '@angular/core';
import { CardsService } from "../../services/cards.service";
import { Card } from '../../models/card';

@Component({
  selector: '  cards-bar',
  templateUrl: './cards-bar.component.html',
  styleUrls: ['./cards-bar.component.sass']
})
export class CardsBarComponent implements OnInit {

  public cards : Array<Card>; 
  public filters = {kind: ''};

  constructor(public cardsService:CardsService) { }

  ngOnInit() {
    this.cards = this.cardsService.cards;
    // console.log(this.cards);
  }

  public resetFilter(){
    this.cardsService.resetFilter();
  }

}
