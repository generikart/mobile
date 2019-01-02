import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events ,LoadingController,ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProductdetailPage } from '../productdetail/productdetail';
/**
 * Generated class for the AddReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html',
})
export class AddReviewPage {
	prod_id ="";
	page_title = {};
	productDetail = {};
	rating ="4";
	public customer_id;
	public toast;
	public author;
  public text;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider,public events: Events,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  	this.prod_id = navParams.get('id');
  	this.page_title = navParams.get('name');
  	events.subscribe('star-rating:changed', (starRating) => {this.rating = starRating;});
   	 this.toast = toastCtrl.create({
      message: 'You review has been added and waiting for admin approval',
      duration: 3000
    });
   	 var user= JSON.parse(localStorage.getItem('user'));
   	 this.customer_id = user.customer_id;
   	 this.author = user.firstname +" "+user.lastname;
}

ionViewDidLoad() {
    console.log('ionViewDidLoad AddReviewPage');
}

AddReviewForm(){
  var apiUrl = "http://generikart.com/index.php?route=api/home/add_review";
  	const params = new FormData();
      params.append('customer_id', this.customer_id);
      params.append('author', this.author);
      params.append('text',this.text);
      params.append('rating',this.rating);
      params.append('prod_id',this.prod_id)
      this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
      		this.toast.present();
      		this.navCtrl.push(ProductdetailPage, {id: this.prod_id,name:this.page_title});
  		},err => {
      });
      return false;
}
}