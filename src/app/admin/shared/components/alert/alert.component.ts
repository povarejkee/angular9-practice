import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';
import { IAlert } from '../../../../shared/interfaces';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  public text = ''
  public type = ''
  private alertSub: Subscription

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$
      .subscribe((alert: IAlert) => {
        this.text = alert.text
        this.type = alert.type

        const timeout = setTimeout(() => {
          this.text = ''
          clearTimeout(timeout)
        }, 3000)
      })
  }

  ngOnDestroy(): void {
    if (this.alertSub) this.alertSub.unsubscribe()
  }

}
