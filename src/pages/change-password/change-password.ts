import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MyAccountPage} from '../my-account/my-account'

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	public password;
	public conf_password;
	public email;
	public alertSuccess;
  	public alertFail;
  	public loader;
  	public rest;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public restP: RestProvider ,public loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  	var user = JSON.parse(localStorage.getItem('user'));
  	this.email = user.email;
  	this.rest = restP;
  	this.loader= this.loadingCtrl.create({
      		content: "Please wait..."
   	 });
  	this.alertSuccess = this.alertCtrl.create({
    		subTitle: 'Update Successfully',
    		buttons: [{text:'Close',handler:data => {
          					navCtrl.setRoot(MyAccountPage);
          					
        				}}]
  		});
   	 this.alertFail = this.alertCtrl.create({
    		subTitle: 'Updation Fail,Please try, again',
    		buttons: [{text:'Close',handler:data => {
   						navCtrl.setRoot(MyAccountPage);
        				}}]
  		});
   	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  ChangePasswordForm(){
  	if(this.password!="" && this.conf_password!="" && this.password==this.conf_password){
		const params = new FormData();
	    params.append('password', this.password);
	    params.append('email',this.email);
	 	var apiUrl = "http://generikart.com/index.php?route=api/customer/change_password_customer";
	   	this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
		       this.loader.dismiss();
		      if (data['success']==101) {
		      	this.alertSuccess.present();	 
		       }else{
		       	this.alertFail.present();
		       }
		 });
	}
  }

}
