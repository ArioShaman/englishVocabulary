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
  public map(list, iteratee){
    return _.map(list, iteratee); 
  }

  public contains(list, value){
    return _.contains(list, value); 
  } 
  public pluck(list, propertyName){
    return _.pluck(list, propertyName);
  } 
  public sample(list){
    return _.sample(list); 
  }
}