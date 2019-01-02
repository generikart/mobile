import { Component } from '@angular/core';
import { LoginPage} from '../login/login'
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
	public loader; 
	public rest;
	public alertSuccess;
	public alertFail;
	public email;
	public navigation;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restP: RestProvider ,public loadingCtrl: LoadingController,private alertCtrl: AlertController) {
 	
 	 this.rest = restP;
   	 this.navigation = navCtrl;

  	this.loader= this.loadingCtrl.create({
      		content: "Please wait..."
   	 });
  	this.alertSuccess = this.alertCtrl.create({
    		subTitle: 'Password link send to email Successfully',
    		buttons: [{text:'Close',handler:data => {
          					navCtrl.setRoot(LoginPage);
        				}}]
  		});
   	 this.alertFail = this.alertCtrl.create({
    		subTitle: 'Enter email not found',
    		buttons: [{text:'Close',handler:data => {
          									console.log('Cancel clicked');
        				}}]
  		});
   	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  ForgotPasswordForm(){
  		const params = new FormData();
    	params.append('email', this.email);
 	var apiUrl = "http://generikart.com/index.php?route=api/customer/forgot_password_customer";
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
