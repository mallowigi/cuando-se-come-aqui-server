import * as _ from "lodash";

import {Injectable} from "angular2/core"
import {Hero} from "../typings/Hero";


let HEROES:Hero[] = [
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

@Injectable()
export class HeroRepository {
  static getHeroes():Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  static addHero(hero:Hero) {
    if (!hero.id) {
      hero.id = _.max(_.pluck(HEROES, 'id')) + 1;
    }
    HEROES.push(hero);
  }


}
