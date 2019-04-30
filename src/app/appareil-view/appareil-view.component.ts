import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false;
  appareils: any[];
  appareilSubscription: Subscription; // on stocke la subscription dans un objet Subscription

  lastUpdate = new Promise (( resolve, reject ) => {
    const date = new Date ();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor( private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[] /* liste appareils émise par le Subject */) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject(); // données pas encore émises par le Subject
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }
}
