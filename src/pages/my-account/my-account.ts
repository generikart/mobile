import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyCartPage } from '../my-cart/my-cart';
import { MyWishlistPage } from '../my-wishlist/my-wishlist';
import { MyOrdersPage } from '../my-orders/my-orders';
import { EditaccountPage } from '../editaccount/editaccount';
import { OrderReturnPage } from '../order-return/order-return';
import { ChangePasswordPage } from '../change-password/change-password'


/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
	public navigation;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.navigation = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

  edit_account(){
  		this.navigation.push(EditaccountPage);
  }

  change_password(){
  		this.navigation.push(ChangePasswordPage);
  }

  wish_list(){
  		this.navigation.setRoot(MyWishlistPage);
  }

  my_cart(){
  		this.navigation.setRoot(MyCartPage);
  }

  order_history(){
  		this.navigation.setRoot(MyOrdersPage);
  }

  order_return(){
  		this.navigation.push(OrderReturnPage);
  }

  newsletter(){
  		//this.navigation.setRoot(EmailetterPage);
  }
}
