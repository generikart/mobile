import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from 'ionic3-star-rating';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
import { ListPage } from '../pages/list/list';
import { PrescriptionorderPage } from '../pages/prescriptionorder/prescriptionorder';
import { ProductbycategoryPage } from '../pages/productbycategory/productbycategory';
import { ProductdetailPage } from '../pages/productdetail/productdetail';
import { EditaccountPage } from '../pages/editaccount/editaccount';
import { OrderReturnPage } from '../pages/order-return/order-return';
import { ChangePasswordPage } from '../pages/change-password/change-password'
import { SettingsPage } from '../pages/settings/settings'
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword'
import { AddReviewPage } from '../pages/add-review/add-review';
import { SearchPage } from '../pages/search/search';
import { CheckoutStep_1Page} from '../pages/checkout-step-1/checkout-step-1'
import { CheckoutStep_2Page} from '../pages/checkout-step-2/checkout-step-2'
import { CheckoutStep_3Page} from '../pages/checkout-step-3/checkout-step-3'
import { AddAddressPage} from '../pages/add-address/add-address'

import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ContactUsPage,
    MyAccountPage,
    LoginPage,
    LogoutPage,
    UserRegisterPage,
    TermConditionPage,
    PrivacyPolicyPage,
    MyWishlistPage,
    MyOrdersPage,
    AboutUsPage,
    PrescriptionorderPage,
    ProductbycategoryPage,
    ProductdetailPage,
    MyCartPage,
    EditaccountPage,
    OrderReturnPage,
    ChangePasswordPage,
    SettingsPage,
    ForgotpasswordPage,
    AddReviewPage,
    SearchPage,
    CheckoutStep_1Page,
    CheckoutStep_2Page,
    CheckoutStep_3Page,
    AddAddressPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MyAccountPage,
    MyCartPage,
    LogoutPage,
    UserRegisterPage,
    TermConditionPage,
    PrivacyPolicyPage,
    MyWishlistPage,
    MyOrdersPage,
    AboutUsPage,
    PrescriptionorderPage,
    ProductbycategoryPage,
    ProductdetailPage,
    ListPage,
    ContactUsPage,
    EditaccountPage,
    OrderReturnPage,
    ChangePasswordPage,
    SettingsPage,
    ForgotpasswordPage,
    AddReviewPage,
    SearchPage,
    CheckoutStep_1Page,
    CheckoutStep_2Page,
    CheckoutStep_3Page,
    AddAddressPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
