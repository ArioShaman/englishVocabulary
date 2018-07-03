import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'grad-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {

  @Input() text:      string;
  @Input() gradClass: string;

  constructor() { 
    if(!this.gradClass){
      this.gradClass = 'grad01';
    }
  }

  ngOnInit() {
    console.log(this.gradClass);
  }

}
