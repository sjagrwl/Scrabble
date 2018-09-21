import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEntityPage } from './add-entity';

@NgModule({
  declarations: [
    AddEntityPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEntityPage),
  ],
})
export class AddEntityPageModule {}
