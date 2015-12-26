import {Component, Input} from "angular2/core"
import {Hero} from "../../models/Hero";
import {HeroRepository} from "../../repositories/heroRepository";

var heroDetailView = require('./heroDetailView.html');
var heroDetailStyle = require('./heroDetailStyle.scss');

@Component({
  selector: 'hero-detail',
  template: heroDetailView,
  styles: [heroDetailStyle],
})

export class HeroDetailComponent {
  constructor(heroRepository: HeroRepository){}
  @Input('hero') public hero:Hero;
}
