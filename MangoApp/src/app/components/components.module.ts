import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { StatusPopoverComponent } from './status-popover/status-popover.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { AlertModalPage } from './alert-modal/alert-modal.page';
@NgModule({
  declarations: [
    SideNavComponent,
    HeaderComponent,
    StatusPopoverComponent,
    AlertModalPage,
    SearchModalComponent,
  ],
  exports: [SideNavComponent, HeaderComponent],
  imports: [FormsModule, CommonModule],
})
export class componentModule {}
