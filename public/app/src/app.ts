import {Component} from 'angular2/core'

const appView = require('./app.jade');
const appStyles = require('./app.scss');

@Component({
  selector: 'my-app',
  template: appView,
  styles: [appStyles]
})

export class App {
  public title = 'Yo';
}
