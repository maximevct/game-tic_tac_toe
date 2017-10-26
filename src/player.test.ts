import * as should from 'should';
import 'mocha';

import { Player, IA     } from './player';
import { MapField, Move } from './mapfield';

describe('Player', () => {
  describe('Init', () => {
    it('should create a new Player', () => {
      let p1:Player = new Player('Player 1');
      should(p1).be.ok();
    })
  })
  describe('Get name', () => {
    it('should get the name of the player', () => {
      let p1:Player = new Player('Player 1');
      should(p1.name).equal('Player 1');
    })
  })
})

describe('IA', () => {
  describe('Play', () => {
    it('should return the best move to play on the map (1, 1) on empty map', () => {
      let p2:Player    = new Player('O');
      let p1:IA        = new IA('X', p2);
      let map:MapField = new MapField();

      let move:Move = p1.play(map);
      should(move.x).equal(1);
      should(move.y).equal(1);
    })
  })
})
