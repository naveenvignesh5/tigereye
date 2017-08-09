import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutmePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutme',
  templateUrl: 'aboutme.html',
})
export class AboutmePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  gotolink(type) {
    switch(type) {
      case 'linkedin':
        window.open('https://www.linkedin.com/in/theace56/','_system');
        break;
      case 'facebook':
        window.open('https://www.facebook.com/naveen.vignesh5','_system');
        break;
      case 'github':
        window.open('https://github.com/theace56','_system');
        break;
      case 'googleplus':
        window.open('https://plus.google.com/104013263024996204585','_system');
        break;
    }

    // keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias naveenvignesh5.nv
    // jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks android-release-unsigned.apk naveenvignesh5.nv

  }
}
