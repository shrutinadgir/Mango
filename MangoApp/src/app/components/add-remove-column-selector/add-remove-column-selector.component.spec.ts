import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRemoveColumnSelectorComponent } from './add-remove-column-selector.component';

describe('AddRemoveColumnSelectorComponent', () => {
  let component: AddRemoveColumnSelectorComponent;
  let fixture: ComponentFixture<AddRemoveColumnSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveColumnSelectorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRemoveColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
