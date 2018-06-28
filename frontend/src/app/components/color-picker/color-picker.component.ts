import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Card } from '../../models/card';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.sass'],
  animations: [
    trigger('colorsState', [
      state('inactive', style({
        width: '0px'
      })),
      state('active',   style({
        width: '300px  '
      })),
      transition('inactive => active', animate('500ms')),
      transition('active => inactive', animate('500ms')),
      transition('* => void', [
        animate(200, style({width: '0px'}))
      ])      
    ]),   
  ]    
})
export class ColorPickerComponent implements OnInit {

  @Input() public childData: Card;

  public colors = ['grad01', 'grad02', 'grad03', 'grad04', 'grad05', 'grad06', 'grad07']
  public colorsState = 'inactive';
  public selectedColor = null;

  constructor(public apiService: ApiService , public acRoute : ActivatedRoute)  { }

  ngOnInit() {
    this.selectedColor = this.childData.colorHash;
  }


  public selectColor(color){

    this.childData.colorHash = color;
    this.selectedColor = color;
    this.apiService.update("vocs/"+1+"/cards/"+this.childData.id  ,this.childData).subscribe((r)=>{
      this.selectedColor = color;
    })    
  }

  public changeState(): void{
    this.colorsState = this.colorsState === 'active' ? 'inactive' : 'active';
  }  

}
