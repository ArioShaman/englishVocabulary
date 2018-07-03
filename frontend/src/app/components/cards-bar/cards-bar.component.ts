import { Component, OnInit } from '@angular/core';
import { CardsService } from "../../services/cards.service";
import { Card } from '../../models/card';
import { HelperService } from '../../services/helper.service';
import { DarkModeService } from "../../services/dark-mode.service";
import { CardDestroyService } from "../../services/card-destroy.service";

@Component({
  selector: '  cards-bar',
  templateUrl: './cards-bar.component.html',
  styleUrls: ['./cards-bar.component.sass']
})
export class CardsBarComponent implements OnInit {

  public cards : Array<Card>; 
  public filters = {kind: ''};
  public darkMode:boolean;  
  public selectedCards: Array<Card> = [];  

  constructor(public cardsService:CardsService,
    public darkModeService:DarkModeService,
    public cardDestroyService:CardDestroyService,
    public _: HelperService) { 
      this.cardsService.cardChange.subscribe((value) => {
        this.cards = value;
      }); 
       this.darkModeService.darkModeChange.subscribe((value) => { 
         this.darkMode = value; 
       });  
       this.cardDestroyService.selectChange.subscribe((value) => { 
          this.selectedCards = value;
       });               
  }

  ngOnInit() {
    this.cards = this.cardsService.getCards(); 
    this.darkMode = this.darkModeService.get();
    this.selectedCards = this.cardDestroyService.getSelected(); 
  }

  public resetFilter(){  
    this.cardsService.resetFilter();
  }

  public resetSelect(){
    this.cardDestroyService.resetSelect();    
  }

  public reorder():void{
    this.cards.reverse();
  }
  public shuffle():void{
    this.cards = this._.shuffle(this.cards);
    this.cardsService.insertData(this.cards);
  }
  public destroyCards():void{
    this.cardDestroyService.open();
  }

}
