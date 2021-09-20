import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

  @Input('userRole') userRole;
  @Output() _selectedTab = new EventEmitter();
  selectedData: string = 'dash';

  constructor() { }

  ngOnInit() { }

  changeSideNav(id) {
    const _self = this;
    if (id == 0) _self.selectedData = 'dash';
    else if (id == 1) _self.selectedData = 'pm';
    else if (id == 2) _self.selectedData = 'ofm';
    else if (id == 3) _self.selectedData = 'om';
    else if (id == 4) _self.selectedData = 'um';
    else if (id == 5) _self.selectedData = 'lm';
    _self._selectedTab.emit(_self.selectedData);
  }

}
