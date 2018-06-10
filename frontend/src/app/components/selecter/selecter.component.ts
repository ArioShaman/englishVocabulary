import { Component, OnInit , Input, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { trigger, state, style, animate, transition, query, animateChild, keyframes} from '@angular/animations';
import { HelperService } from '../../services/helper.service';
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

  constructor(public apiService: ApiService,
    public _: HelperService
  ) { }

  ngOnInit() {
    // this.selectedkind = '';
    this.getKinds();
  }

  public getKinds(){
    this.apiService.get("kinds").subscribe((data: any)=>{
      this.kinds = data;
    })          
  }
  public selectKind(kind):void{
    this.filters.kind = kind;
    console.log(this.filters);
  }
  public isInArray(array, value):void{
    array = this._.pluck(array, 'name');
    return this._.contains(array, value);
  }
  public create(name):void{
    var kind = {name: name};
    this.apiService.post("kinds", kind).subscribe((r)=>{
      this.filters.kind = name;
      this.selectKind(name);
      this.getKinds();
    });
    this.getKinds();    
  }

}
