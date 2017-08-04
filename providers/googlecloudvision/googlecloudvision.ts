import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environment';

/*
  Generated class for the GooglecloudvisionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GooglecloudvisionProvider {

  constructor(public http: Http) {}

  getImageInfo(base64Img,type) {
    const body = {
      'requests':[
        {
          'image':{ 'content':base64Img },
          'features':[
            {'type':type,'maxResults':1}
          ] 
        }
      ]
    }

    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key='+environment.googleCloudVisionAPIKey,body)
    .map(res => res.json());
  }

}
