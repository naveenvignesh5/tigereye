import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-source',
  templateUrl: 'source.html',
})
export class SourcePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  gotogitrepo() {
    window.open('https://bitbucket.org/theace56/tiger-eye','_system');
  }
}
