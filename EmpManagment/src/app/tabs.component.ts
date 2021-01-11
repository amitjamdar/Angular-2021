import { Component, Input } from '@angular/core';
import {TabComponent} from './tab.component' ;
@Component({
  selector: 'tabs',
  template: `<ul class="list-inline list-unstyle tab-ul">
                <li class="list-inline-item list-item tab-list" [ngClass] = "{active: tab.active == true}"*ngFor="let tab of tabs" (click)="selectTab(tab)">{{ tab.tabTitle }}</li>
            </ul>
            <div class="tab-content"><ng-content></ng-content></div>`
    ,
  styles: [`h1 { font-family: Lato; }`]
})
export class TabsComponent  {
  tabs: TabComponent[] = [];
    constructor(){}
  addTab(tab:TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab:TabComponent) {
    this.tabs.forEach((tab) => {
      tab.active = false;
     
    });
    tab.active = true;
  }
}
