import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Card } from '../../models/card';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';

@Component({
  selector: 'app-color-picker',
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

  public colors = ["#A3FF8A", "#94CCFF", "#C55E59", "#FC8A40" , "#40FCB4", "#B767D0"];
  public colorsState = 'inactive';
  public selectedColor = null;

  constructor(public apiService: ApiService , public acRoute : ActivatedRoute)  { }

  ngOnInit() {
  }


  public selectColor(color){

    this.childData.colorHash = color;

    this.apiService.update("cards/"+this.childData.id  ,this.childData).subscribe((r)=>{
      this.selectedColor = '#fff';
    })    
  }

  public changeState(): void{
    this.colorsState = this.colorsState === 'active' ? 'inactive' : 'active';
  }  

}
