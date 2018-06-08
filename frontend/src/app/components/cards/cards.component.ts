import { ContentChild, ViewChild, Component, OnInit , Input, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Card } from '../../models/card';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import { HelperService } from '../../services/helper.service';
import { ModalComponent } from '../modal/modal.component';

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
  public filters = {kind: ''};
  public opened:boolean = false;
  public deleteId:number;

  // @ViewChild(ModalComponent) modalComponent: ModalComponent;

  constructor(public apiService: ApiService,
   public router : Router,
    @Inject('navState') public navState:string,
    public _: HelperService
    ) {
    // console.log(navState);
  }

  
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
  //разобраться с переопределением метода ребенка
  // ngAfterViewInit(){
  //   this.modalComponent.close();
  // }

  public open(){
    this.opened = true;
  }

  public close(){
    this.opened = false;
  }

  public onFilter(kind:string){
    this.filters.kind = kind;
  }

  public resetFilter():void{
    this.filters.kind = ''; 
  }
  public shuffle():void{
    this.cards = this._.shuffle(this.cards);
  }
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
    // console.log(arr);
  }

  public update(id:string){
    console.log("update : " + id );
    this.router.navigateByUrl('/products/add/' + id);
  }

  public onSelect(card: Card): void {
    this.disactive(card);
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
  public kind(kind_id){
    this.apiService.get("kinds/"+kind_id).subscribe((data: any)=>{
      return data.name;
    })  
  }
}
