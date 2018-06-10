import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'modal',
  template: '<ng-content></ng-content>',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() public opened: boolean;

  constructor() {
  }

  ngOnInit() {
    // console.log(this.opened);
  
  }
}
