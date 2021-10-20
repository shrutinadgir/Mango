import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { SearchModalComponent } from 'src/app/components/search-modal/search-modal.component';
@Component({
  selector: 'app-status-popover',
  templateUrl: './status-popover.component.html',
  styleUrls: ['./status-popover.component.scss'],
})
export class StatusPopoverComponent implements OnInit {
  @Input() type: string;
  selectedUsers: any = [];
  constructor(
    public modalController: ModalController,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  selectType(type) {
    type == 'assign' || type == 'edit' || type == 'delete'
      ? this.openSearchModal(type)
      : this.popoverController.dismiss(type);
  }

  async openSearchModal(type) {
    let props = { type };
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      componentProps: props,
      showBackdrop: false,
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      result.data.selectedUsers
        ? (this.selectedUsers = result.data.selectedUsers)
        : (this.selectedUsers = []);
      this.popoverController.dismiss(this.selectedUsers);
    });
  }
}
