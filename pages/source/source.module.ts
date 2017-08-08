import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SourcePage } from './source';

@NgModule({
  declarations: [
    SourcePage,
  ],
  imports: [
    IonicPageModule.forChild(SourcePage),
  ],
})
export class SourcePageModule {}
