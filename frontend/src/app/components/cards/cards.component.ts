import { ContentChild, ViewChild, Component, OnInit , Input, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../models/card';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import { ModalComponent } from '../modal/modal.component';
import {Observable} from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

//Services
import { HelperService } from '../../services/helper.service';
import {  AuthService } from "../../services/auth.service";
import {  Angular2TokenService, AuthData, UserData } from "angular2-token";
import {  SharedService } from "../../services/shared.service";
import { DarkModeService } from "../../services/dark-mode.service";
import { CardsService } from "../../services/cards.service";
import { CardDestroyService } from "../../services/card-destroy.service";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass', '../../../assets/styles/modal.sass'],
  animations: [
    trigger('cardState', [
      state('inactive', style({
        transform: 'rotateY(0deg)'
      })),
      state('active',   style({
        transform: 'rotateY(180deg)'
      })),
      transition('inactive <=> active', animate('700ms')),
      // transition('active => inactive', animate('700ms')),
    ]),   
    trigger('navState', [
      state('inactive', style({
        width: '50px',    
        minWidth: '50px',
        maxWidth: '50px'
      })),
      state('active',   style({
        width: '200px',    
        minWidth: '200px',
        maxWidth: '200px'
      })),
      transition('inactive => active', animate('500ms')),
      transition('active => inactive', animate('500ms')),
      transition('* => void', [
        animate(200, style({width: '0px'}))
      ])      
    ]), 
    trigger('selectState', [
      state('active', style({
        'display': 'block'
      })),
      state('inactive', style({
        'display': 'none'
      })),
      ]
     ),  
  ]  
})

export class CardsComponent implements OnInit {
  public columns = ['id','eng','rus','engSentence','rusSentence','colorHash'];
  public cards : Array<Card>; 
  public kinds : Array<any>;
  public selectedCard: Card;
  public selectedCards: Array<Card> = [];
  public darkMode:boolean;
  public filters = {kind: ''};
  public opened:boolean = false;
  public deleteId:number;
  public state = 'cards';
  public currentUser:any;
  public cardIndex: any;
  public vocId:number;


  constructor(public apiService: ApiService,
   public router : Router,
    @Inject('navState') public navState:string,
    public _: HelperService,
    public authService:AuthService,
    public authTokenService:Angular2TokenService,
    public shared:SharedService,
    public cardsService:CardsService,
    public acRoute : ActivatedRoute,
    public darkModeService:DarkModeService,
    public cardDestroyService:CardDestroyService
    ) {
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        });   
        this.cardsService.cardChange.subscribe((value) => {
          this.cards = value;
        });   
        this.cardDestroyService.openChange.subscribe((value) => {
          this.opened = value;
        }); 
        this.cardDestroyService.selectChange.subscribe((value) => {
          this.selectedCards = value;
        });                   
  }

  
  ngOnInit() {
    this.darkMode = this.darkModeService.get();
    this.cardDestroyService.clean();
    this.acRoute.params.subscribe((data : any)=>{
      if(data && data.id){ 
        this.vocId = data.id;
        console.log(this.vocId);
        this.authTokenService.get("vocs/"+data.id+"/cards").map(res => res.json()).subscribe(
            res =>{
              for(let obj of res){
                obj["state"] = 'inactive';
                obj["selected"] = 'inactive';
              }
              this.cards = res;
              // console.log(this.cards);
              this.cardsService.insertData(this.cards);
              this.shared.set(this.state);   
            },
            error => {
               this.router.navigate(['/auth'])
            }
        );                    
      }
    });


    this.filters = this.cardsService.filters;
  }

  sayhello(){
    console.log('hello!!');
  }

  public open(){
    this.cardDestroyService.open();
  }

  public close(){
    this.cardDestroyService.close();
  }

  public onFilter(kind:string){
    this.cardsService.setFilter(kind);
  }


  public destroy(){
    this.acRoute.params.subscribe((data : any)=>{
      this.selectedCards.forEach(card =>{
        var path = "vocs/"+data.id+"/cards/" + card.id;
        card.selected = 'inactive';
        this.authTokenService.delete(path).subscribe(
          res =>{
            this.cards.splice(this.cards.indexOf(card), 1);
            console.log(res);
          },
          error=>{
            console.log(error);
          });
      });
      
    });
    this.selectedCards.splice(0, this.selectedCards.length)
    this.close();
  }
  public disactive(actCard):void{
    var arr = this._.map(this.cards, function(card){
      if (card !== actCard){
      card.state = 'inactive';
      }
    });
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
    this.disactive(card);
    card.state = card.state === 'active' ? 'inactive' : 'active';
  } 
  public changeSelect(card: Card):void{
    card.selected = card.selected === 'active' ? 'inactive' : 'active'; 
    if(card.selected == 'active'){
      this.cardDestroyService.insertCard(card);
    }else{
      this.cardDestroyService.destroyCard(card);
    }
  }
}
