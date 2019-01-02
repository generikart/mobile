import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Events,ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MyAccountPage} from '../my-account/my-account'
import { UserRegisterPage} from '../user-register/user-register'
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	public email ="";
	public password ="";
	public error = "";
	public loader;
	public alertcontrol;
	public rest;
	public navigation;
  public toast;
  public toast_needF;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public restP: RestProvider , 
    public events:Events,
    public toastCtrl:ToastController) {
  	//this.loader = loadingCtrl;
  	this.rest = restP;
  	this.navigation = navCtrl;
  	
  }

  ionViewDidLoad() {
    
    
  }

  loginForm(){
  	this.createAlert();
     if(this.email.length !=0 && this.password.length!=0){
  	 	const params = new FormData();
    	params.append('email', this.email);
    	params.append('password', this.password);
	 	  this.loader.present().then(() =>{
       var apiUrl = "http://generikart.com/index.php?route=api/customer/login_customer";
	  	 this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
              this.loader.dismiss(); 
    		      if (data['success']==101) {
    		      		localStorage.setItem("login", "1");
    		      		localStorage.setItem('user', JSON.stringify(data['response']));
    					    this.events.publish('user:login');
                  this.navigation.setRoot(MyAccountPage);
    		      }else{
    		      		this.toast.present();
    		      }
		    });
      });
  	
     }else{
          this.toast_needF.present();
      }
  	 
  }
registerForm(){
    this.navigation.push(UserRegisterPage);
}
forgotPasswordForm(){
  this.navigation.push(ForgotpasswordPage); 
}

  createAlert(){
    this.loader= this.loadingCtrl.create({
          content: "Please wait..."
     });
    this.toast = this.toastCtrl.create({
      message: 'incorrect username and password!',
      duration: 3000
    });
    this.toast_needF = this.toastCtrl.create({
      message: 'username and password required',
      duration: 3000
    });
    
  }
}
