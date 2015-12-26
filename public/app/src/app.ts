import {Component, View, OnInit} from 'angular2/core'
import {HeroDetailComponent} from './components/hero-detail/heroDetail';
import {HeroListComponent} from './components/hero-list/heroList';

import {HeroRepository} from "./repositories/heroRepository";
import {Hero} from "./models/Hero";

const appView = require('./app.html');
const appStyles = require('./app.scss');

@Component({
  selector: 'my-app',
  template: appView,
  styles: [appStyles],
  directives: [HeroDetailComponent, HeroListComponent],
  providers: [HeroRepository]
})

export class App implements OnInit {
  constructor(private heroRepository:HeroRepository) {
  }

  ngOnInit():any {
    this.getHeroes();
  }


  public heroes:Hero[];
  public selectedHero:Hero;

  private getHeroes():Hero[] {
    this.heroRepository.getHeroes()
      .then((heroes) => this.heroes = heroes);
  }
}
