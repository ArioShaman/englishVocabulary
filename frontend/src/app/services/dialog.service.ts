import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { CacheService, CacheStoragesEnum } from 'ng2-cache';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public dialogState:string;
  public dialogStateChange: Subject<string> = new Subject<string>();

  constructor(private cache: CacheService) { 
      this.dialogState = 'open';
  }

  public get(){
    return this.dialogState;
  }

  public open(id){
    this.dialogState = 'open';
    this.dialogStateChange.next(this.dialogState);
  }

  public close(){
    this.dialogState = 'close';
    this.dialogStateChange.next(this.dialogState);
  }

}
