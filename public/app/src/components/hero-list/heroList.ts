import {Component, Input} from "angular2/core"
import {Hero} from "../../models/Hero";

var heroListView = require('./heroListView.html');
var heroListStyle = require('./heroListStyle.scss');

@Component({
  selector: 'hero-list',
  template: heroListView,
  styles: [heroListStyle],
})

export class HeroListComponent {
  @Input('heroes') public heroes:Hero[];
  @Input('hero') public selectedHero:Hero;

  public onSelect(hero:Hero) {
    this.selectedHero = hero;
  }
}
