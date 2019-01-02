import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MyAccountPage} from '../my-account/my-account'
//import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the UserRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
   providers:  [ RestProvider ]
})
export class UserRegisterPage {
	public loader; 
	public rest;
	public alertSuccess;
	public alertFail;
	public firstname;
	public lastname;
	public email;
	public telephone;
	public password;
	public navigation;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restP: RestProvider ,public loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  	 this.loader= this.loadingCtrl.create({
      		content: "Please wait..."
   	 });
   	 this.alertSuccess = this.alertCtrl.create({
    		subTitle: 'Registration Successfully',
    		buttons: [{text:'Close',handler:data => {
          					//navCtrl.setRoot(MyAccountPage);
          					window.location.reload();
        				}}]
  		});
   	 this.alertFail = this.alertCtrl.create({
    		subTitle: 'Registration Fail,Please try, again',
    		buttons: [{text:'Close',handler:data => {
          									console.log('Cancel clicked');
        				}}]
  		});
   	 
  //  	 this.user = new FormGroup({
  //  		firstname: new FormControl('Dayana', Validators.required),
  //  		lastname: new FormControl('Uruguay', Validators.required)
		// });
   	 this.rest = restP;
   	 this.navigation = navCtrl;
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegisterPage');
  }
  
RegistrationForm(){
	///this.firstname = new FormControl('', Validators.required)
		this.loader.present();  
  		this.register();
  }

  register() {
  	const params = new FormData();
    params.append('firstname', this.firstname);
    params.append('lastname', this.lastname);
    params.append('email', this.email);
    params.append('telephone', this.telephone);
    params.append('password', this.password);
 	var apiUrl = "http://generikart.com/index.php?route=api/customer/add_customer";
  	this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
	      this.loader.dismiss();
	      if (data['success']==101) {
	      	localStorage.setItem('user', JSON.stringify(data['response']));
	      	localStorage.setItem("login", "1");
	      	 this.alertSuccess.present(); 
	      }else{
	      	this.alertFail.present();
	      }
	});
  }
}
