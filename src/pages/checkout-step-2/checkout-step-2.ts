import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import { CheckoutStep_3Page } from '../checkout-step-3/checkout-step-3'
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the CheckoutStep_2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout-step-2',
  templateUrl: 'checkout-step-2.html',
})
export class CheckoutStep_2Page {
	public loader; 
	public payments = [];
	public customer_id;
	public address_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider ,public loadingCtrl: LoadingController) {
  	var user = JSON.parse(localStorage.getItem('user'));
  	this.address_id = navParams.get('address_id');
  	this.customer_id = user.customer_id;
  	this.payments = [];
  	this.getData();
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutStep_2Page');
  }
checkout(){
  	this.navCtrl.push(CheckoutStep_3Page);	
  }

getData() {
    this.loaders();
    this.loader.present().then(() =>{
 	    var apiUrl = "http://generikart.com/index.php?route=api/payment/get_payment_method";
 	    const params = new FormData();
	    params.append('customer_id', this.customer_id);
	    params.append('address_id',this.address_id);
  	      this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
             this.payments = data['response'];
  	         this.loader.dismiss();
	        });
    });
  }

loaders(){
  this.loader= this.loadingCtrl.create({
          content: "Please wait..."
     });
}


}
