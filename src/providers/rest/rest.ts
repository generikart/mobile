import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController} from 'ionic-angular';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
	
	list:any;
  	headers : any;
  	//data = any;
  	public  data = {};
  	public loader;
	
  constructor(public http: HttpClient,public loadingCtrl: LoadingController) {
     		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.loader=loadingCtrl.create({
          content: "Please wait...",
          dismissOnPageChange: true
        });
  }
  
  getDataFromJSONPOST(url,param) {
    
    //this.loader.present();  
		return new Promise(resolve => {
		    this.http.post(url,param).subscribe(data => {
      //    this.loader.dismiss();
        //  this.loader = null;
		      resolve(data);
		    }, err => {
          //this.loader.dismiss();
          //this.loader = null;
		      console.log(err);
		    });
		  });
    
	}

  getDataFromJSONPOSTSEARCH(url,param) {
    return new Promise(resolve => {
        this.http.post(url,param).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    
  }

}
