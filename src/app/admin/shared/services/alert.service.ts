import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlert } from '../../../shared/interfaces';

@Injectable()
export class AlertService {
  public alert$: Subject<IAlert> = new Subject<IAlert>()

  callAlert(options: IAlert): void {
    return this.alert$.next({ ...options })
  }

  constructor() { }
}
