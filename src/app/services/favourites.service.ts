import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private key = '__fav__iFaith__'
  localStorage: any;

  constructor() {
    this.localStorage = window.localStorage;
  }

  init(item: number){
    this.localStorage.setItem(this.key, item.toString());
  }

  add(item: number){
    let items = this.localStorage.getItem(this.key) as string;
    if (items){
      let array = items.split(',').map(item => {
        return parseInt(item);
      });
      if (!array.includes(item)){
        array.push(item);
        this.localStorage.setItem(this.key, array.toString());
      }
    } else {
      this.init(item);
    }
  }

  remove(item: number): boolean{
    let removed = false;
    let items = this.localStorage.getItem(this.key) as string;
    if (items){
      let array = items.split(',').map(item => {
        return parseInt(item);
      });
      if (array.includes(item)){
        array.splice(array.indexOf(item), 1);
        this.localStorage.setItem(this.key, array.toString());
        removed = true;
      }
    }
    return removed;
  }

  getItems(): number[]{
    let items = this.localStorage.getItem(this.key) as string;
    let array: number[];
    if (items){
      array = items.split(',').map(item => {
        return parseInt(item);
      });
    } else {
      array = [];
    }
    return array;
  }

  clear(){
    this.localStorage.removeItem(this.key);
  }

}
