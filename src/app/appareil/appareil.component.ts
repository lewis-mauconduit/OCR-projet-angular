import { Component, Input, OnInit } from '@angular/core';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() index: number;
  @Input() id: number;

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  }

  getStatus() {
    return this.appareilStatus;
  }

  getColor() {
    if (this.appareilStatus === 'éteint') {
      return 'red';
    }
    else if (this.appareilStatus === 'allumé') {
      return 'green';
    }
  }

  onSwitch() {
    if (this.appareilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
    else if (this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    }
  }

  getId() {
    return this.id;
  }

}
