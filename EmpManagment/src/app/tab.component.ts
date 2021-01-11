import { Component, Input } from '@angular/core';
import {TabsComponent} from './tabs.component';
@Component({
  selector: 'tab',
  template: `<div [hidden]="!active">
      <ng-content></ng-content> 
    </div>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class TabComponent  {
   @Input() tabTitle;
   active = false;
  constructor(tabs: TabsComponent) {
    tabs.addTab(this)
  }
}