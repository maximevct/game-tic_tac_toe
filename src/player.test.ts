import * as should from 'should';
import 'mocha';

import { Player, IA     } from './player';
import { MapField, Move } from './mapfield';

describe('Player', () => {
  describe('Init', () => {
    it('should create a new Player', () => {
      let p1:Player = new Player('1', 'X');
      should(p1).be.ok();
    })
  })
  describe('Get name', () => {
    it('should get the name of the player', () => {
      let p1:Player = new Player('1', 'X');
      should(p1.name).equal('1');
    })
  })
})

describe('IA', () => {
  describe('Play', () => {
    it('should return the best move to play on the map (1, 1) on empty map', () => {
      let p2:Player    = new Player('2', 'O');
      let p1:IA        = new IA('1', 'X', p2);
      let map:MapField = new MapField();

      let move:Move = p1.play(map);
      should(move.x).equal(1);
      should(move.y).equal(1);
    })
    it('should return the move to win', () => {
      let p2:Player    = new Player('2', 'O');
      let p1:IA        = new IA('1', 'X', p2);
      let map:MapField = new MapField();

      map.map = [
        'X X',
        'O  ',
        ' O '
      ]
      let move:Move = p1.play(map);
      should(move.x).equal(1);
      should(move.y).equal(0);
    })
    it('should return the move to not lose', () => {
      let p2:Player    = new Player('2', 'O');
      let p1:IA        = new IA('1', 'X', p2);
      let map:MapField = new MapField();

      map.map = [
        'O O',
        'X  ',
        ' X '
      ]
      let move:Move = p1.play(map);
      should(move.x).equal(1);
      should(move.y).equal(0);
    })
  })
})
