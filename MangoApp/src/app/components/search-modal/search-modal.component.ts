import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  @Input() type: any;
  isItemAvailable = false;
  dummyData = [];
  users = [];
  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.users = [];
  }
  initializeItem() {
    this.dummyData = [
      {
        albumId: 1,
        id: 1,
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://wallpaperaccess.com/full/2213426.jpg',
        name: 'John',
        checked: false,
      },
      {
        albumId: 1,
        id: 2,
        title: 'reprehenderit est deserunt velit ipsam',
        url: 'https://via.placeholder.com/600/771796',
        thumbnailUrl:
          'https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg',
        name: 'Rayon',
        checked: false,
      },
      {
        albumId: 1,
        id: 3,
        title: 'officia porro iure quia iusto qui ipsa ut modi',
        url: 'https://via.placeholder.com/600/24f355',
        thumbnailUrl:
          'https://data.whicdn.com/images/322027365/original.jpg?t=1541703413',
        name: 'Jack',
        checked: false,
      },
      {
        albumId: 1,
        id: 4,
        title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
        url: 'https://via.placeholder.com/600/d32776',
        thumbnailUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoR705XkXkGGsCyzwkEBv72MLAkns5q7NVXr5NemRUiKYZ9VYPWRGKayXmXhhEMmvuOaI&usqp=CAU',
        name: 'Raju',
        checked: false,
      },
      {
        albumId: 1,
        id: 5,
        title: 'natus nisi omnis corporis facere molestiae rerum in',
        url: 'https://via.placeholder.com/600/f66b97',
        thumbnailUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3e6GhxT-87Dy--Q1NI8mu31-vobrE4ruInA&usqp=CAU',
        name: 'Ramesh',
        checked: false,
      },
    ];
  }
  getItems(ev: any) {
    console.log('get data', ev);

    // Reset items back to all of the items
    this.initializeItem();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.dummyData = this.dummyData.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.isItemAvailable = false;
    }
  }
  addUser(event, data) {
    data.checked = event.detail.checked;
    this.dummyData.find((item) => item.id == data.id).checked = data.checked;
  }
  close() {
    this.modalController.dismiss({
      dismissed: true,
      // selectedDashboardWidgets: value
    });
  }
  assignUser(type) {
    this.dummyData.filter((each: any) => {
      each.checked ? this.users.push(each) : '';
    });
    this.modalController
      .dismiss({
        dismissed: true,
        selectedUsers: this.users,
      })
      .then(() => (this.users = []));
  }
}
