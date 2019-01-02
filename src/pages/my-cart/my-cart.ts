import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {LoginPage} from '../login/login';
import {CheckoutStep_1Page} from '../checkout-step-1/checkout-step-1';

/**
 * Generated class for the MyCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {
	public loader; 
	public rest;
  public quantity=10;
  public products;
  public totals;
  public toast;
  public total=0;
  public card_detail;
  public code;
  public login;
  constructor(public navCtrl: NavController,public restp: RestProvider,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.login = localStorage.getItem("login");
    this.rest = restp;
  	this.getCart();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
    localStorage.removeItem("products");
    localStorage.removeItem("payment_detail");
  }

  sub_qty(cart_id,quantity){
    quantity = parseInt(quantity)-1;
    this.editCart(cart_id,quantity);    
  }

  add_qty(cart_id,quantity){
    quantity = parseInt(quantity)+1;
    this.editCart(cart_id,quantity);
  }

del_proct(cart_id){
  this.loaders();
  this.loader.present().then(() =>{
  var apiUrl = "http://generikart.com/index.php?route=api/cart/delete";
      const params = new FormData();
      params.append('cart_id', cart_id);
    this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
        this.products=data['response']['product'];
        this.card_detail = data['response']['total'];
        this.loader.dismiss();
  });
  });
}
  getCart() {
    this.loaders();
    this.loader.present().then(() =>{
 	    var apiUrl = "http://generikart.com/index.php?route=api/cart/get_cart";
  	      this.rest.getDataFromJSONPOST(apiUrl,{}).then(data => {
             this.products=data['response']['product'];
             this.card_detail = data['response']['total'];
  	         this.loader.dismiss();
	        });
    });
  }


  editCart(cart_id,quantity) {
    this.loaders();
    this.loader.present().then(() =>{
  var apiUrl = "http://generikart.com/index.php?route=api/cart/edit";
      const params = new FormData();
      params.append('cart_id', cart_id);
      params.append('quantity', quantity);
    this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
        this.products=data['response']['product'];
        this.card_detail = data['response']['total'];
        this.loader.dismiss();
      });
  });
  }

applyCouponForm(){
  this.loaders();
  if(this.code!=""){
      this.loader.present().then(() =>{
        var apiUrl = "http://generikart.com/index.php?route=api/cart/coupon_apply";
        const params = new FormData();
        params.append('code', this.code);
      this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
          this.products=data['response']['product'];
          this.card_detail = data['response']['total'];
          this.loader.dismiss();

        });
    });
  }
}

checkout(){
  if(this.login==1){
      localStorage.setItem('products', JSON.stringify(this.products));
      localStorage.setItem('payment_detail', JSON.stringify(this.card_detail));
      this.navCtrl.push(CheckoutStep_1Page);
  }else{
      this.navCtrl.push(LoginPage);
  }
}
loaders(){
  this.loader= this.loadingCtrl.create({
          content: "Please wait..."
     });
    this.toast = this.toastCtrl.create({
      message: 'You have modified your shopping cart',
      duration: 3000
    });
}
}
