import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { HomePage } from '../home/home'
/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events) {
  	localStorage.setItem("login", "0");
  	localStorage.setItem("user", "");
  	navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    this.events.publish('user:logout');
  }

}
