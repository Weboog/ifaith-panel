import { CurrentChannel } from '../types/current_channel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ProgramService {

  private selectedChannel = new BehaviorSubject<CurrentChannel>({ id: '', name: '', programTitle: '', link: '' });
  public initCurChannel = new BehaviorSubject<{id: number, name: string, link: string}>({id: 0, name: '', link: ''});

  constructor() {}

  setCurrentChannel(id: string, name: string, programTitle: string, link?: string){
    this.selectedChannel.next({ id: id, name: name, programTitle: programTitle, link: link });
  }

  getCurrentChannel(): Observable<CurrentChannel>{
    return this.selectedChannel.asObservable();
  }
}
