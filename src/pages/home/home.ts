import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { PrescriptionorderPage } from '../prescriptionorder/prescriptionorder';
import { ProductbycategoryPage } from '../productbycategory/productbycategory';
import { ProductdetailPage } from '../productdetail/productdetail';
import { MyCartPage } from '../my-cart/my-cart';
import {SearchPage } from '../search/search';
import { MyAccountPage} from '../my-account/my-account'
import { LoginPage} from '../login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
   providers:  [ RestProvider ]
})
export class HomePage {
	data: any;
	 categories: string[];
	 public matches:{};
	 public selected :{};
//	 products: string[];
	 categoryproducts:string[];
	public loader; 
	public search_string = "";
  constructor(public navCtrl: NavController,public rest: RestProvider,public loadingCtrl: LoadingController) {
    this.getData();
  	 this.matches = {};
  	 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Home page');
  }


  getResults(event){
  	  this.matches = [];
    this.selected = {
      id: '',
      name: ''
    };
    if(this.search_string !=""){
	    const params = new FormData();
	     params.append('search_string', this.search_string);
	 	var apiUrl = "http://generikart.com/index.php?route=api/home/search";
	    this.rest.getDataFromJSONPOSTSEARCH(apiUrl,params).then(data => {
		      this.matches = data;

		});
	}
 }

selectItem(prod_id,prod_name){
//	this.matches = [];
//	this.onCancel();
	this.navCtrl.push(ProductdetailPage, {id: prod_id,name:prod_name});
}

 onCancel(){
	 this.matches = [];
}


cart(){
	this.navCtrl.push(MyCartPage);
}

myaccount(){
	var login_status = JSON.parse(localStorage.getItem('login'));
	if(login_status ==1){
		this.navCtrl.setRoot(MyAccountPage);
	}else{
		this.navCtrl.push(LoginPage);
	}
  	
	
}

notification(){
	this.navCtrl.push(MyCartPage);
}

openOrderwithPres(){
	
	this.navCtrl.setRoot(PrescriptionorderPage, {
      id: "123",
      name: "Carl"
    });
	//this.navCtrl.setRoot(PrescriptionorderPage);
}

openProductbycategory(cate_id,cate_name){
	this.navCtrl.setRoot(ProductbycategoryPage, {id: cate_id,name:cate_name});
	//this.navCtrl.setRoot(PrescriptionorderPage);
}

openProductDetail(prod_id,prod_name){
	this.navCtrl.push(ProductdetailPage, {id: prod_id,name:prod_name});
}

loders(){
	this.loader=this.loadingCtrl.create({
      		content: "Please wait..."
   	 });
    
}
doRefresh(refresher){
	this.getData();
	 setTimeout(() => {
      refresher.complete();
    }, 2000);
}
 getData() {
 	this.loders();
 	var apiUrl = "http://generikart.com/index.php?route=api/home";
  	this.loader.present().then(() =>{
  	this.rest.getDataFromJSONPOST(apiUrl,{}).then(data => {
	      this.categories = data['category'];
	      this.categoryproducts = data['category2'];
	      this.loader.dismiss();
	});
  });
  }
  
}
