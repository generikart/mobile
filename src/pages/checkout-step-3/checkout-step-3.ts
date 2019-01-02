import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Events,ToastController  } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the CheckoutStep_3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout-step-3',
  templateUrl: 'checkout-step-3.html',
})
export class CheckoutStep_3Page {
	public products;
	public card_detail;
	public customer;
	public address_id;
	public loader;
	public product_id ="";
  constructor(public navCtrl: NavController,public navParams: NavParams, public rest: RestProvider,public loadingCtrl: LoadingController) {
  	this.products =JSON.parse(localStorage.getItem('products'));
  	for (var i = 0; i < this.products.length; i++) {
  		 this.product_id = this.product_id +"^"+this.products[i].cart_id;
  	}

  	this.card_detail = JSON.parse(localStorage.getItem('payment_detail'));
  	this.customer = JSON.parse(localStorage.getItem('user'));
  	this.address_id = JSON.parse(localStorage.getItem('address_id'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutStep_3Page');
  }

  place_order(){
  	this.createAlert();
  	 	const params = new FormData();
    	params.append('product_id',this.product_id);
    	params.append('customer_id',this.customer.customer_id);
    	params.append('address_id',this.address_id);
	 	//  this.loader.present().then(() =>{
       var apiUrl = "http://generikart.com/index.php?route=api/order/add";
	  	 this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
           //   this.loader.dismiss(); 
    		      if (data['success']==101) {
    		      		
    		      }else{
    		      	 //this.toast.present();
    		      }
		    });
      //});
  }
createAlert(){
    this.loader= this.loadingCtrl.create({
          content: "Please wait..."
     });
    // this.toast = this.toastCtrl.create({
    //   message: 'Error in order!,Please try again',
    //   duration: 3000
    // });
    // this.toast_needF = this.toastCtrl.create({
    //   message: 'username and password required',
    //   duration: 3000
    // });
    
  }
}
