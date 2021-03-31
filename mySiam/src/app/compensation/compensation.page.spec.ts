import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompensationPage } from './compensation.page';

describe('CompensationPage', () => {
  let component: CompensationPage;
  let fixture: ComponentFixture<CompensationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompensationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
