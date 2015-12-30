import {Component, Input} from "angular2/core"
import {Hero} from "../../typings/Hero";
import {HeroDetailComponent} from "../hero-detail/heroDetail";

var heroListView = require('./heroListView.html');
var heroListStyle = require('./heroListStyle.scss');

@Component({
  selector: 'hero-list',
  template: heroListView,
  styles: [heroListStyle],
  directives: [HeroDetailComponent]
})

export class HeroListComponent {
  @Input('heroes') public heroes:Hero[];
  @Input('hero') public selectedHero:Hero;

  public onSelect(hero:Hero):void {
    this.selectedHero = hero;
  }
}
