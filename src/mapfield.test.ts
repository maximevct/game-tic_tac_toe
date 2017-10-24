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
})
