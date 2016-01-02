import {App, Platform} from 'ionic-framework/ionic';

var appView = require('./app.html');

@App({
  template: appView
})
export class MyApp {
  constructor(platform: Platform) {

    // this tells the tabs component which Pages
    // should be each tab's root Page

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
