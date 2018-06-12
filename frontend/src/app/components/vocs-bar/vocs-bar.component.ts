import { Component, OnInit } from '@angular/core';
import { DarkModeService } from "../../services/dark-mode.service";

@Component({
  selector: 'vocs-bar',
  templateUrl: './vocs-bar.component.html',
  styleUrls: ['./vocs-bar.component.sass']
})
export class VocsBarComponent implements OnInit {

  public darkMode:boolean;  
  constructor(public darkModeService:DarkModeService) { 
    this.darkModeService.darkModeChange.subscribe((value) => { 
      this.darkMode = value; 
    });    
  }

  ngOnInit() {
    this.darkMode = this.darkModeService.get();
  }

}
