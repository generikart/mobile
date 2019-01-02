import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import { AddAddressPage } from '../add-address/add-address';
import { CheckoutStep_2Page } from '../checkout-step-2/checkout-step-2'
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the CheckoutStep_1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout-step-1',
  templateUrl: 'checkout-step-1.html',
})
export class CheckoutStep_1Page {
	public loader; 
	public address_id;
	public address=[];
	public customer_id;
	public shipping =[];
	public shipping_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider ,public loadingCtrl: LoadingController) {
  	var user = JSON.parse(localStorage.getItem('user'));
  	this.customer_id = user.customer_id;
  	this.shipping =[];
  	this.address = [];
  	this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutStep_1Page');
  }

  add_new_address(){
  	this.navCtrl.push(AddAddressPage);
  }
 
  checkout(){
  	if(this.address_id && this.shipping_id){
  	localStorage.setItem('address_id', JSON.stringify(this.address_id));
  	localStorage.setItem('shipping_method', JSON.stringify(this.shipping_id));
  	var payment_detail = JSON.parse(localStorage.getItem('payment_detail'));
  	var payment =[]; var total = 0;
  	for (var i = 0; i < payment_detail.length; i++) {
  		if(payment_detail[i].text =="Total"){
  			var ship_m= this.shipping_id.split("^");
  			total = payment_detail[i].value+  +parseInt(ship_m[2]);
  			payment_detail[i].text = ship_m[1];
  			payment_detail[i].value = ship_m[2];
  		}

  		payment.push(payment_detail[i]);
	}
	 payment.push({'text':'Total','value':total});
	localStorage.setItem('payment_detail', JSON.stringify(payment));  	
  	this.navCtrl.push(CheckoutStep_2Page, {'address_id': this.address_id});	
  	}
  	
  }

getData() {
    this.loaders();
    this.loader.present().then(() =>{
 	    var apiUrl = "http://generikart.com/index.php?route=api/address/get_address";
 	    const params = new FormData();
	    params.append('customer_id', this.customer_id);
  	      this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
             this.address=data['response']['address'];
             this.shipping = data['response']['shipping'];
  	         this.loader.dismiss();
	        });
    });
  }
get_shipping_method(){
	this.loaders();
	if(this.address_id){
   		//this.loader.present().then(() =>{
	 	    var apiUrl = "http://generikart.com/index.php?route=api/address/get_shipping_method";
	 	    const params = new FormData();
		    params.append('address_id', this.address_id);
	  	      this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
	             this.shipping=data['response'];
	  	         
		        });
	  	  //  this.loader.dismiss();  
    	//});
	}
}


loaders(){
  this.loader= this.loadingCtrl.create({
          content: "Please wait..."
     });
}
}
