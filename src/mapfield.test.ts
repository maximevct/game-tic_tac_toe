import * as should from 'should';
import 'mocha';

import { MapField } from './mapfield'

describe(`MapField`, () => {
  describe(`Init`, () => {
    it(`should create a mapfield`, () => {
      let mapfield:MapField = new MapField();
      should(mapfield).be.ok();
    })
    it(`should create an empty mapfield`, () => {
      let mapfield:MapField = new MapField();
      should(mapfield.map).deepEqual([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
      ])
    })
  })
  describe(`Play`, () => {
    it(`should insert 'X' on mapfield`, () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(0, 0, 'X')).be.ok();
    })
    it(`should insert 'X' on 0, 0`, () => {
      let mapfield:MapField = new MapField();
      mapfield.play(0, 0, 'X')
      should(mapfield.map).deepEqual([
        ['X', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
      ])
    })
    it(`should insert 'X' on 1, 0`, () => {
      let mapfield:MapField = new MapField();
      mapfield.play(1, 0, 'X')
      should(mapfield.map).deepEqual([
        [' ', ' ', ' '],
        ['X', ' ', ' '],
        [' ', ' ', ' ']
      ])
    })
    it(`should insert 'X' on 0, 1`, () => {
      let mapfield:MapField = new MapField();
      mapfield.play(0, 1, 'X')
      should(mapfield.map).deepEqual([
        [' ', 'X', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
      ])
    })
    it(`should insert 'X' on 2, 1`, () => {
      let mapfield:MapField = new MapField();
      mapfield.play(2, 1, 'X')
      should(mapfield.map).deepEqual([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', 'X', ' ']
      ])
    })
    it(`should not insert 'X' on -1, 0`, () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(-1, 0, 'X')).not.be.ok();
    })
    it(`should not insert 'X' on 0, -1`, () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(0, -1, 'X')).not.be.ok();
    })
    it(`should not insert 'X' on 3, 0`, () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(3, 0, 'X')).not.be.ok();
    })
    it(`should not insert 'X' on 0, 3`, () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play(0, 3, 'X')).not.be.ok();
    })
  })
})
