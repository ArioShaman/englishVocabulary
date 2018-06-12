import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.sass']
})
export class AuthDialogComponent implements OnInit {
  @Input('auth-mode') authMode: 'Login' | 'Register' = 'Login';
  // modalActions = new EventEmitter<string>();


  constructor(private router: Router) { }

  ngOnInit() {
  }


  onLoginFormResult(e){
    if(e.signedIn)
      this.router.navigateByUrl('/vocs');
    else{
      console.log(e.err);
    }
  }

  openDialog(mode: 'Login' | 'Register' = 'Login'){
    this.authMode = mode;
    // this.modalActions.emit({action:"modal", params:['open']});
  }

  isLoginMode(){return this.authMode == 'Login'}
  isRegisterMode(){return this.authMode == 'Register'}    

}
