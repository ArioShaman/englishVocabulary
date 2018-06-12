import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    myGlobalVar:string;

    constructor(){
      this.myGlobalVar = 'main';
      // console.log(this.myGlobalVar);
      // alert("My intial global variable value is: " + this.myGlobalVar);
    }

    set(val: string){
      this.myGlobalVar = val;
    }

    get(){
      return this.myGlobalVar;
    }
}
