import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  public darkMode:boolean;
  public darkModeChange: Subject<boolean> = new Subject<boolean>();
  
  constructor() { 
    this.darkMode = false;
  }

  public get(){
    return this.darkMode;
  }
  public changeMode(){
    this.darkMode = !this.darkMode;
    this.darkModeChange.next(this.darkMode);
  }
}
