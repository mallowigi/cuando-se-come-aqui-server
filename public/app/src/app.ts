import {Component} from 'angular2/core'
import {User} from "./models/User";

const appView = require('./app.html');
const appStyles = require('./app.scss');

var HEROES:User[] = [
  {'id': 11, 'name': 'Mr. Nice'},
  {'id': 12, 'name': 'Narco'},
  {'id': 13, 'name': 'Bombasto'},
  {'id': 14, 'name': 'Celeritas'},
  {'id': 15, 'name': 'Magneta'},
  {'id': 16, 'name': 'RubberMan'},
  {'id': 17, 'name': 'Dynama'},
  {'id': 18, 'name': 'Dr IQ'},
  {'id': 19, 'name': 'Magma'},
  {'id': 20, 'name': 'Tornado'}
];

@Component({
  selector: 'my-app',
  template: appView,
  styles: [appStyles]
})

export class App {
  public user:User = {
    id: 1,
    name: 'William'
  };
  public heroes = HEROES;
}
