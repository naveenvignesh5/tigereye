import { Component } from '@angular/core';
import { NavController,LoadingController,ToastController,AlertController,IonicPage } from 'ionic-angular';
import { GooglecloudvisionProvider } from '../../providers/googlecloudvision/googlecloudvision';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private loading;
  private imgChoice;
  options:CameraOptions = {
    quality:100,targetWidth:500,targetHeight:500,destinationType:this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.PNG,mediaType:this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController,private loadingCtrl:LoadingController,private toastCtrl:ToastController,
  private googleApi:GooglecloudvisionProvider,private camera:Camera,private alertCtrl:AlertController,
  private imgPicker:ImagePicker) {}

  //method to recognize text from camera
  getOCR() {
    this.camera.getPicture(this.options).then((picData)=>{
      this.showLoading();
      this.googleApi.getImageInfo(picData,'TEXT_DETECTION').subscribe((data)=>{
        this.loading.dismiss();
        this.showAlert('What the text says...',data.responses[0].textAnnotations[0].description);
      },err=>{
        this.loading.dismiss();
        this.toast('Error in calling api. Check your Internet');
      });
    },err=>{
      this.toast('Picture not obtained');
    });
  }

  //method to recognize image from camera
  getImageType() {
    this.camera.getPicture(this.options).then((picData)=>{
      this.showLoading();
      this.googleApi.getImageInfo(picData,'LABEL_DETECTION').subscribe((data)=>{
          this.navCtrl.push('ImgresultPage',{'data':data.responses[0].labelAnnotations});
          this.loading.dismiss();
      },err=>{
        this.loading.dismiss();
        this.toast('Error in obtaining text. Check your Internet');
      });
    },err=>{
      this.toast('Picture not obtained');
    });
  }

  imgOptions = {
    maximumImagesCount: 1,
    width:500,height:500,quality:100,
    outputType:1
  };
  //method to recognize data from file
  pickImg() {
    this.imgPicker.getPictures(this.imgOptions).then((picData)=>{
      if(this.imgChoice=="ocr") {
        this.showLoading();
        this.googleApi.getImageInfo(picData[0],'TEXT_DETECTION').subscribe((data)=>{
          this.loading.dismiss();
          this.showAlert('What the text says...',data.responses[0].textAnnotations[0].description);
        },err=>{
          this.loading.dismiss();
          this.toast('Error in calling api. Check your Internet');
        });
      }
      else if(this.imgChoice=="imgrec") {
        this.showLoading();
        this.googleApi.getImageInfo(picData[0],'LABEL_DETECTION').subscribe((data)=>{
            this.navCtrl.push('ImgresultPage',{'data':data.responses[0].labelAnnotations});
            this.loading.dismiss();
        },err=>{
          this.loading.dismiss();
          this.toast('Error in calling api. Check your Internet');
        });
      }
    },err=>{
      this.toast('File Not Choosen !!!');
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

  gotoPage(page) {
    this.navCtrl.push(page);
  }


}
