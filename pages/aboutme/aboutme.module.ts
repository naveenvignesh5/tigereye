import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutmePage } from './aboutme';

@NgModule({
  declarations: [
    AboutmePage,
  ],
  imports: [
    IonicPageModule.forChild(AboutmePage),
  ],
})
export class AboutmePageModule {}
