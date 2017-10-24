import * as should from 'should';
import 'mocha';

import { MapField } from './mapfield';
import { Player   } from './player';

describe('MapField', () => {
  describe('Init', () => {
    it('should create a mapfield', () => {
      let mapfield:MapField = new MapField();
      should(mapfield).be.ok();
    })
    it('should create an empty mapfield', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.map).deepEqual([
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ])
    })
  })
  describe('Play', () => {
    it('should play on the mapfield', () => {
      let mapfield:MapField = new MapField();

      should(mapfield.play(0, 0, new Player('X'))).be.ok();
    })
    it('should player 1 play on 0, 0', () => {
      let mapfield:MapField = new MapField();
      let p:Player = new Player('X');

      mapfield.play(0, 0, p)
      should(mapfield.map).deepEqual([
        [p   , null, null],
        [null, null, null],
        [null, null, null]
      ])
    })
    it('should player 1 play on 1, 0', () => {
      let mapfield:MapField = new MapField();
      let p:Player = new Player('X');

      mapfield.play(1, 0, p)
      should(mapfield.map).deepEqual([
        [null, null, null],
        [p   , null, null],
        [null, null, null]
      ])
    })
    it('should player 1 play on 0, 1', () => {
      let mapfield:MapField = new MapField();
      let p:Player = new Player('X');

      mapfield.play(0, 1, p)
      should(mapfield.map).deepEqual([
        [null, p   , null],
        [null, null, null],
        [null, null, null]
      ])
    })
    it('should player 1 play on 2, 1', () => {
      let mapfield:MapField = new MapField();
      let p:Player = new Player('X');

      mapfield.play(2, 1, p)
      should(mapfield.map).deepEqual([
        [null, null, null],
        [null, null, null],
        [null, p   , null]
      ])
    })
    it('should player 1 play on 0, 0 and player 2 play on 1, 1', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('X');
      let p2:Player = new Player('X');

      mapfield.play(0, 0, p1)
      mapfield.play(1, 1, p2)
      should(mapfield.map).deepEqual([
        [p1  , null, null],
        [null, p2  , null],
        [null, null, null]
      ])
    })
    it('should player 1 play on 0, 0 and player 2 play on 1, 1 and be different', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('X');
      let p2:Player = new Player('X');

      mapfield.play(0, 0, p1)
      mapfield.play(1, 1, p2)
      should(mapfield.map[0][0]).not.equal(p2)
    })
    it('should not be able to play on -1, 0', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(-1, 0, new Player('X'))).not.be.ok();
    })
    it('should not be able to play on 0, -1', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(0, -1, new Player('X'))).not.be.ok();
    })
    it('should not be able to play on 3, 0', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(3, 0, new Player('X'))).not.be.ok();
    })
    it('should not be able to play on 0, 3', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(0, 3, new Player('X'))).not.be.ok();
    })
  })
  describe('Score', () => {
    it('should get the score of the map', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('X');

      should(mapfield.score(p1)).equal(0);
    })
    it('should get the score of the map with first column winner', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('X');

      mapfield.map = [
        [p1, null, null],
        [p1, null, null],
        [p1, null, null]
      ];
      should(mapfield.score(p1)).equal(1);
    })
    it('should get the score of the map with second column winner', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('X');

      mapfield.map = [
        [null, p1, null],
        [null, p1, null],
        [null, p1, null]
      ];
      should(mapfield.score(p1)).equal(1);
    })
    it('should get the score of the map with third column winner', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('X');

      mapfield.map = [
        [null, null, p1],
        [null, null, p1],
        [null, null, p1]
      ];
      should(mapfield.score(p1)).equal(1);
    })
    it('should get the score of the map with second and third column winner', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('X');

      mapfield.map = [
        [null, p1, p1],
        [null, p1, p1],
        [null, p1, p1]
      ];
      should(mapfield.score(p1)).equal(2);
    })
  })
})
