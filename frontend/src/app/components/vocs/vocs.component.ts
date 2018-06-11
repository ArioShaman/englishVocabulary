import { Component, OnInit } from '@angular/core';
import {  SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-vocs',
  templateUrl: './vocs.component.html',
  styleUrls: ['./vocs.component.sass']
})
export class VocsComponent implements OnInit {
  public state = 'vocs';
  
  constructor(public shared:SharedService) { }

  ngOnInit() {
     this.shared.set(this.state);   
  }

}
