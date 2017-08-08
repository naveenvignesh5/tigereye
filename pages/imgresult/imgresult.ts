import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImgresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imgresult',
  templateUrl: 'imgresult.html',
})
export class ImgresultPage {
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = this.navParams.get('data');
  }

}
