import { Component, OnInit } from '@angular/core';
import {  SharedService } from "../../services/shared.service";
import { DarkModeService } from "../../services/dark-mode.service";

@Component({
  selector: 'app-vocs',
  templateUrl: './vocs.component.html',
  styleUrls: ['./vocs.component.sass']
})
export class VocsComponent implements OnInit {
  public state = 'vocs';
  public darkMode:boolean;

  constructor(public shared:SharedService,
    public darkModeService:DarkModeService) {
        this.darkModeService.darkModeChange.subscribe((value) => { 
          this.darkMode = value; 
        });    
    }

  ngOnInit() {
    this.darkMode = this.darkModeService.get();
    this.shared.set(this.state);   
  }

}
