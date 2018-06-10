import { Pipe, PipeTransform, Directive, Component } from '@angular/core';
// import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { Filter } from './models/filter';
@Pipe({
  name: 'myFilter',
  pure: false
})


export class MyFilterPipe implements PipeTransform {

  // transform(items: any[], field : string, value : string): any[] {  
  //   if (!items) return [];
  //   if (!value || value.length == 0) return items;
  //   return items.filter(it => 
  //     it[field].indexOf(value) !=-1
  //   );
  // }

  transform(items: any[], filter: Filter): any[] {  
    if (!items) return [];
    if (!filter.kind || filter.kind.length == 0) return items;
    return items.filter(item => 
      item.kind.indexOf(filter.kind) !== -1
    );
  }

}
