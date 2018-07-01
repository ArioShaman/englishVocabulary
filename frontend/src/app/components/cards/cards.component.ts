import { ContentChild, ViewChild, Component, OnInit , Input, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Card } from '../../models/card';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import { HelperService } from '../../services/helper.service';
import { ModalComponent } from '../modal/modal.component';
import {  AuthService } from "../../services/auth.service";
import {  Angular2TokenService, AuthData, UserData } from "angular2-token";
import {Observable} from 'rxjs/Observable';
import {  SharedService } from "../../services/shared.service";
import { CardsService } from "../../services/cards.service";
import { ActivatedRoute } from '@angular/router';
import { DarkModeService } from "../../services/dark-mode.service";


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
  ]  
})

export class CardsComponent implements OnInit {
  public columns = ['id','eng','rus','engSentence','rusSentence','colorHash'];
  public cards : Array<Card>; 
  public kinds : Array<any>;
  public selectedCard: Card;
  public darkMode:boolean;
  public filters = {kind: ''};
  public opened:boolean = false;
  public deleteId:number;
  public state = 'cards';
  public currentUser:any;


  constructor(public apiService: ApiService,
   public router : Router,
    @Inject('navState') public navState:string,
    public _: HelperService,
    public authService:AuthService,
    public authTokenService:Angular2TokenService,
    public shared:SharedService,
    public cardsService:CardsService,
    public acRoute : ActivatedRoute,
    public darkModeService:DarkModeService
    ) {
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        });   
        this.cardsService.cardChange.subscribe((value) => {
          this.cards = value;
        });          
        // this.authTokenService.init();            
  }

  
  ngOnInit() {
    this.darkMode = this.darkModeService.get();
    this.acRoute.params.subscribe((data : any)=>{
      if(data && data.id){
        this.apiService.get("vocs/"+data.id+"/cards")
        .subscribe((data : Card[])=>{
          for(let obj of data){
            obj["state"] = 'inactive';
          }
          this.cards = data;
          // console.log(this.cards);
          this.cardsService.insertData(this.cards);
          this.shared.set(this.state);
          // this.cardsService.getCards();
        });             
      }
    });
    this.filters = this.cardsService.filters;
  }

  sayhello(){
    console.log('hello!!');
  }

  // public logOut(){
  //   this.authService.logOutUser().subscribe(() => this.router.navigate(['/auth']));
  // }

  public open(){
    this.opened = true;
  }

  public close(){
    this.opened = false;
  }

  public onFilter(kind:string){
    // this.filters.kind = kind;
    this.cardsService.setFilter(kind);
  }

  // public resetFilter():void{
  //   // console.log(this.authTokenService.currentUserData[);
  //   this.filters.kind = ''; 
  // }

  public destroy(id:number){
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
    this.close();
  }
  public delete(id:number){
    this.open();
    this.deleteId = id;
    // console.log("delete : " + id);


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
}
