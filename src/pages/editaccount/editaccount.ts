import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MyAccountPage} from '../my-account/my-account'

/**
 * Generated class for the EditaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditaccountPage {

  public firstname="";
  public lastname ="";
  public email ="";
  public telephone= "";
  public customer_id ="";
  public alertSuccess;
  public alertFail;
  public loader;
  public rest;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restP: RestProvider ,public loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  	var user = JSON.parse(localStorage.getItem('user'));
  	this.firstname = user.firstname;
  	this.lastname = user.lastname;
  	this.email = user.email;
  	this.telephone = user.telephone;
  	this.customer_id = user.customer_id;
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
    console.log('ionViewDidLoad EditaccountPage');
  }

EditAccountForm(){
	if(this.firstname!="" && this.lastname!="" &&  this.telephone!=""){
		const params = new FormData();
	    params.append('firstname', this.firstname);
	    params.append('lastname', this.lastname);
	    params.append('email', this.email);
	    params.append('telephone', this.telephone);
	    params.append('customer_id',this.customer_id);
	 	var apiUrl = "http://generikart.com/index.php?route=api/customer/edit_customer";
	   	this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
		       this.loader.dismiss();
		      if (data['success']==101) {
		      	localStorage.setItem('user', JSON.stringify(data['response']));
		      	this.alertSuccess.present();	 
		       }else{
		       	this.alertFail.present();
		       }
		 });
	}
}
}
