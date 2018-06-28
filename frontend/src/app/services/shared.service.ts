import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    public myGlobalVar:string;
    public varChange:Subject<string> = new Subject<string>();

    constructor(){
      this.myGlobalVar = 'main';
    }

    set(val: string){
      this.myGlobalVar = val;
      this.varChange.next(this.myGlobalVar);
    }

    get(){
      return this.myGlobalVar;
    }
}
