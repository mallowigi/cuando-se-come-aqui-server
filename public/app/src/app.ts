import {Component} from 'angular2/core'

const myAppView = require('./myApp.jade')();
const myAppStyles = require('./myApp.scss');

@Component({
  selector: 'my-app',
  template: myAppView,
  styles: [myAppStyles]
})

export class App {
  constructor(){}
}
