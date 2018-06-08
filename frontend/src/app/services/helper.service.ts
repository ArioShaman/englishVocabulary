import { Injectable } from '@angular/core';
import { _ } from 'underscore';

@Injectable()
export class HelperService {

  constructor() { }

  public each(array, delegate) {
    return _.each(array, delegate);
  }

  public shuffle(array){
    return _.shuffle(array);
  }
  public find(list, predicate) {
    return _.find(list, predicate) ;
  }
}