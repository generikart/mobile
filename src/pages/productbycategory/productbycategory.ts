import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProductdetailPage } from '../productdetail/productdetail';
/**
 * Generated class for the ProductbycategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productbycategory',
  templateUrl: 'productbycategory.html',
   providers:  [ RestProvider ]
})
export class ProductbycategoryPage {
	page_title ={};
	public cate_id;
	categoryproducts={};
   public hexColor: string = '#000000';
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider) {
  	 this.cate_id = navParams.get('id');
  	 this.page_title = navParams.get('name');
  	  this.getData();
  	 
  }

  ionViewDidLoad() {
  }
  
openProductDetail(prod_id,prod_name){
  this.navCtrl.push(ProductdetailPage, {id: prod_id,name:prod_name});
}

  
getData() {
 	var apiUrl = "http://generikart.com/index.php?route=api/home/productbycategory";
 	const params = new FormData();
    	params.append('cate_id', this.cate_id);
    	this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
	      this.categoryproducts = data;
	      console.log(this.categoryproducts);
	});
  }
addWishList(prod_id) {
  var apiUrl = "http://generikart.com/index.php?route=api/home/addwishlist";
      const params = new FormData();
      var user = JSON.parse(localStorage.getItem('user'));
      params.append('prod_id', prod_id);
      params.append('customer_id', user.customer_id);
       this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
        console.log(data);
        this.getData();
  });
  }
}
