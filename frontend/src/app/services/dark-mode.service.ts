import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { CacheService, CacheStoragesEnum } from 'ng2-cache';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  public darkMode:boolean;
  public darkModeChange: Subject<boolean> = new Subject<boolean>();
  
  constructor(private cache: CacheService) { 
    if (this.cache.get('darkMode')){
      this.darkMode = this.cache.get('darkMode');
    }else{
      this.darkMode = false;
      this.cache.set('darkMode', this.darkMode);
    }
  }

  public get(){
    return this.darkMode;
  }
  public changeMode(){
    this.cache.set('darkMode', !this.darkMode);
    this.darkMode = !this.darkMode;
    this.darkModeChange.next(this.darkMode);
  }
}
