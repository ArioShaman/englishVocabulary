import { Component, OnInit } from '@angular/core';
import { DialogService } from "../../services/dialog.service";

@Component({
  selector: 'dialog-widget',
  templateUrl: './dialog-widget.component.html',
  styleUrls: ['./dialog-widget.component.sass']
})
export class DialogWidgetComponent implements OnInit {

  public images = [
                     {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                     {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                  ]
  public dialogState:string;// = 'open';
  
  constructor(public dialog: DialogService) { 
    this.dialog.dialogStateChange.subscribe((value) => { 
      this.dialogState = value; 
    }); 
  }

  ngOnInit() {
    this.dialogState = this.dialog.get();
  }

  public close(){
    this.dialog.close();
  }
}
