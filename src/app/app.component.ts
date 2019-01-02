import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { MyAccountPage } from '../pages/my-account/my-account';
import { MyCartPage } from '../pages/my-cart/my-cart';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { MyWishlistPage } from '../pages/my-wishlist/my-wishlist';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermConditionPage } from '../pages/term-condition/term-condition';
import { UserRegisterPage } from '../pages/user-register/user-register';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { SettingsPage } from '../pages/settings/settings'
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword'
//import { ListPage } from '../pages/list/list';

import { RestProvider } from '../providers/rest/rest';

@Component({
  templateUrl: 'app.html',
  providers:  [ RestProvider ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //public rest;
  rootPage: any = HomePage;
  public login= localStorage.getItem("login");
  public api_token = localStorage.getItem('api_token');
  pages: Array<{title: string, component: any}>;
  myaccount_pages: Array<{title: string,icon:string, component: any}>;
  

  constructor(public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public events : Events,
      public rest: RestProvider) {
    this.initializeApp();
    this.listenForLoginEvents();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'About Us', component: AboutUsPage },
      { title: 'Contact Us', component: ContactUsPage },
      { title: 'Term & Condition', component: TermConditionPage },
      { title: 'Privacy Policy', component: PrivacyPolicyPage }
    ];
    
    
   // this.login = 0;
	this.rest = rest;
  }

  initializeApp() {
    
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
    if(!this.api_token){
      this.getTocken();  
    }
    
  }
listenForLoginEvents() {
  this.myaccount_pages = [];
  if(this.login =="1"){
          this.myaccount_pages.push( { title: 'My Account',icon:'person', component: MyAccountPage}); 
          this.myaccount_pages.push( { title: 'My Order',icon:'person', component: MyOrdersPage}); 
          this.myaccount_pages.push( { title: 'My Cart',icon:'person', component: MyCartPage}); 
          this.myaccount_pages.push( { title: 'My Wishlist',icon:'person', component: MyWishlistPage}); 
          this.myaccount_pages.push( { title: 'Setting',icon:'person', component: SettingsPage});
          this.myaccount_pages.push( { title: 'Logout',icon:'person', component: LogoutPage});
    }else{
          this.myaccount_pages.push( { title: 'Login',icon:'person', component: LoginPage}); 
          this.myaccount_pages.push( { title: 'Register',icon:'person', component: UserRegisterPage}); 
          this.myaccount_pages.push( { title: 'Forgot Password',icon:'person',component:ForgotpasswordPage});
    }
  this.events.subscribe('user:login', () => {
     this.myaccount_pages = [];
          this.myaccount_pages.push( { title: 'My Account',icon:'person', component: MyAccountPage}); 
          this.myaccount_pages.push( { title: 'My Order',icon:'person', component: MyOrdersPage}); 
          this.myaccount_pages.push( { title: 'My Cart',icon:'person', component: MyCartPage}); 
          this.myaccount_pages.push( { title: 'My Wishlist',icon:'person', component: MyWishlistPage}); 
          this.myaccount_pages.push( { title: 'Setting',icon:'person', component: SettingsPage});
          this.myaccount_pages.push( { title: 'Logout',icon:'person', component: LogoutPage});
    });
  this.events.subscribe('user:logout', () => {
     this.myaccount_pages = [];
          this.myaccount_pages.push( { title: 'Login',icon:'person', component: LoginPage}); 
          this.myaccount_pages.push( { title: 'Register',icon:'person', component: UserRegisterPage}); 
          this.myaccount_pages.push( { title: 'Forgot Password',icon:'person',component:ForgotpasswordPage});
  });


}
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getTocken(){
      var apiUrl = "http://generikart.com/index.php?route=api/login";
      const params = new FormData();
      params.append('key',"eAHrrgskxDOodq6b7Nzt8kdAqwTqxWB6vZ420mb75JQPCUhRNvBkvb2ZNx4D785YtlFOLIP3jlJmUjCLqC8B8QOWByb3Ub17hAaoJZh7yVeGHIxY8nXqp4dso5P44bbxru4xjsfSwHcWFb4PKtzYdZbyNFQkzazTzWye2aK1iS3K2lPAIgKkdNA182yxRr0P0ZqjbWbHQpIkAMJvA4ZhNrKJoUtUJUT8s0gabJLNT7O5GXWLFBEStAsG7Hj6JHC8");
      params.append('username',"swapnil");
       this.rest.getDataFromJSONPOST(apiUrl,params).then(data => {
         console.log(data);
         if(data['success']==101){
             localStorage.setItem('api_token', JSON.stringify(data['api_token']));
         }
       });
  }
}
