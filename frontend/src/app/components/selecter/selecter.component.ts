import { Component, OnInit , Input, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import { Kind } from '../../models/kind';


@Component({
  selector: 'app-selecter',
  templateUrl: './selecter.component.html',
  styleUrls: ['./selecter.component.sass']
})
export class SelecterComponent implements OnInit {
  @Input() public filters: Kind;

  public kinds : Array<any>;
  // public filters = {kind: ''};

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    // this.selectedkind = '';
    this.apiService.get("kinds").subscribe((data: any)=>{
      this.kinds = data;
    })  
  }

  public selectKind(kind):void{
    this.filters.kind = kind;
  }
}
