import { Component } from '@angular/core';
import { LoadingController ,IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MyCartPage } from '../my-cart/my-cart';
import { AddReviewPage } from '../add-review/add-review';


/**
 * Generated class for the ProductdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
  providers:  [ RestProvider ]
})
export class ProductdetailPage {
	prod_id ="";
	page_title = {};
	productDetail = {};
	public loader; 
  public rest;
  public toast;
  public qty;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restp: RestProvider,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  	 this.prod_id = navParams.get('id');
  	 this.page_title = navParams.get('name');
	    this.rest = restp;
     // this.loader.present();  
  	  this.getData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailPage');
  }

  cart(){
  this.navCtrl.setRoot(MyCartPage);
}

openProductDetail(prod_id,prod_name){
  this.navCtrl.push(ProductdetailPage, {id: prod_id,name:prod_name});
}

add_review(prod_id,prod_name){
  this.navCtrl.push(AddReviewPage, {id: prod_id,name:prod_name});
}

  add_to_cart(){
    this.createAlerts();
    var apiUrl = "http://generikart.com/index.php?route=api/cart/add";
    const params = new FormData();
        params.append('product_id', this.prod_id);
        params.append('quantity',this.qty);
        this.loader.present().then(() =>{
          this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {    
            //this.productDetail = data['product'];
            this.loader.dismiss();       
            this.toast.present();
            //this.navCtrl.push(ProductdetailPage, {id: this.prod_id,name:this.page_title});
          });
        });  
 }


  getData() {
 	    this.createAlerts();
      var apiUrl = "http://generikart.com/index.php?route=api/home/productbyid";
 	    const params = new FormData();
    	params.append('product_id', this.prod_id);
    	this.loader.present().then(() =>{
        this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
    	    this.productDetail = data['product'];
    	    console.log(this.productDetail);
    	    this.loader.dismiss();
    });
	});
  }
  
 createAlerts(){
  this.loader=this.loadingCtrl.create({
          content: "Please wait..."
     });
    this.toast = this.toastCtrl.create({
      message: 'You have modified your shopping cart',
      duration: 3000
    });
 }
}
