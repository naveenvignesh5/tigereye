import { Component } from '@angular/core';
import { NavController,LoadingController,ToastController,AlertController,IonicPage } from 'ionic-angular';
import { GooglecloudvisionProvider } from '../../providers/googlecloudvision/googlecloudvision';
import { Camera,CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private loading;

  options:CameraOptions = {
    quality:100,targetWidth:500,targetHeight:500,destinationType:this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.PNG,mediaType:this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController,private loadingCtrl:LoadingController,private toastCtrl:ToastController,
  private googleApi:GooglecloudvisionProvider,private camera:Camera,private alertCtrl:AlertController) {}

  getOCR() {
    this.camera.getPicture(this.options).then((picData)=>{
      this.showLoading();
      this.googleApi.getImageInfo(picData,'TEXT_DETECTION').subscribe((data)=>{
        this.loading.dismiss();
        this.showAlert('What the text says...',data.responses[0].textAnnotations[0].description);
      },err=>{
        this.loading.dismiss();
        this.toast('Error in obtaining text');
      });
    },err=>{
      this.toast('Picture not obtained');
    });
  }

  getImageType() {
    this.camera.getPicture(this.options).then((picData)=>{
      this.showLoading();
      this.googleApi.getImageInfo(picData,'LABEL_DETECTION').subscribe((data)=>{
        this.loading.dismiss();
        this.showAlert('Obtained Data',data.responses[0].labelAnnotations[0].description);
      },err=>{
        this.loading.dismiss();
        this.toast('Error in obtaining text');
      });
    },err=>{
      this.toast('Picture not obtained');
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner:'dots',content:'Processing Image. Please Wait...'
    });

    setTimeout(()=>{
      this.loading.dismiss();
    },20000);

    this.loading.present();
  }

  toast(msg) {
    let t = this.toastCtrl.create({
      message:msg,duration:2500,position:'bottom'
    });
    t.present();
  }

  showAlert(title,msg) {
    let alert = this.alertCtrl.create({
      title:title,message:msg,buttons:[{text:'Ok'}]
    });
    alert.present();
  }
}
