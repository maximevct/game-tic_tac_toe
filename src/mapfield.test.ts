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
        '   ',
        '   ',
        '   '
      ])
    })
  })
  describe('Play', () => {
    it('should play on the mapfield', () => {
      let mapfield:MapField = new MapField();

      should(mapfield.play({y: 0, x : 0}, new Player('1', 'X'))).be.ok();
    })
    it('should player 1 play on 0, 0', () => {
      let mapfield:MapField = new MapField();
      let p:Player = new Player('1', 'X');

      mapfield.play({y: 0, x : 0}, p)
      should(mapfield.map).deepEqual([
        'X  ',
        '   ',
        '   '
      ])
    })
    it('should player 1 play on 1, 0', () => {
      let mapfield:MapField = new MapField();
      let p:Player = new Player('1', 'X');

      mapfield.play({y: 1, x : 0}, p)
      should(mapfield.map).deepEqual([
        '   ',
        'X  ',
        '   '
      ])
    })
    it('should player 1 play on 0, 1', () => {
      let mapfield:MapField = new MapField();
      let p:Player = new Player('1', 'X');

      mapfield.play({y: 0, x : 1}, p)
      should(mapfield.map).deepEqual([
        ' X ',
        '   ',
        '   '
      ])
    })
    it('should player 1 play on 2, 1', () => {
      let mapfield:MapField = new MapField();
      let p:Player = new Player('1', 'X');

      mapfield.play({y: 2, x : 1}, p)
      should(mapfield.map).deepEqual([
        '   ',
        '   ',
        ' X '
      ])
    })
    it('should player 1 play on 0, 0 and player 2 play on 1, 1', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');
      let p2:Player = new Player('2', 'O');

      mapfield.play({y: 0, x : 0}, p1)
      mapfield.play({y: 1, x : 1}, p2)
      should(mapfield.map).deepEqual([
        'X  ',
        ' O ',
        '   '
      ])
    })
    it('should player 1 play on 0, 0 and player 2 play on 1, 1 and be different', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');
      let p2:Player = new Player('2', 'O');

      mapfield.play({y: 0, x : 0}, p1)
      mapfield.play({y: 1, x : 1}, p2)
      should(mapfield.map[0][0]).not.equal(p2)
    })
    it('should not be able to play on -1, 0', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play({y: -1, x : 0}, new Player('1', 'X'))).not.be.ok();
    })
    it('should not be able to play on 0, -1', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play({y: 0, x : -1}, new Player('1', 'X'))).not.be.ok();
    })
    it('should not be able to play on 3, 0', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play({y: 3, x : 0}, new Player('1', 'X'))).not.be.ok();
    })
    it('should not be able to play on 0, 3', () => {
      let mapfield:MapField = new MapField();
      should(mapfield.play({y: 0, x : 3}, new Player('1', 'X'))).not.be.ok();
    })
    it('should not be able to play when map is filled', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');

      mapfield.map = [
        'XXX',
        'XXX',
        'XXX'
      ];
      should(mapfield.play({y: 0, x : 0}, p1)).not.be.ok();
    })
    it('should not be able to play on another player', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');
      let p2:Player = new Player('2', 'O');
      
      mapfield.play({y: 0, x : 0}, p1);
      should(mapfield.play({y: 0, x : 0}, p2)).not.be.ok();
    })
    it('should not be able to play on himself', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');
      
      mapfield.play({y: 0, x : 0}, p1);
      should(mapfield.play({y: 0, x : 0}, p1)).not.be.ok();
    })
  })
  describe('Score', () => {
    it('should get the score of the map', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');

      should(mapfield.score(p1)).equal(0);
    })
    it('should get the score of the map with first column winner', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');

      mapfield.map = [
        'X  ',
        'X  ',
        'X  '
      ];
      should(mapfield.score(p1)).equal(10);
    })
    it('should get the score of the map with second column winner', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');

      mapfield.map = [
        ' X ',
        ' X ',
        ' X '
      ];
      should(mapfield.score(p1)).equal(10);
    })
    it('should get the score of the map with third column winner', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');

      mapfield.map = [
        '  X',
        '  X',
        '  X'
      ];
      should(mapfield.score(p1)).equal(10);
    })
    it('should get the score of the map with second and third column winner', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');

      mapfield.map = [
        ' XX',
        ' XX',
        ' XX'
      ];
      should(mapfield.score(p1)).equal(20);
    })
  })
  describe('getMoves', () => {
    it('should return 1 possible move for the game', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');

      mapfield.map = [
        ' XX',
        'XXX',
        'XXX'
      ];
      let moves = mapfield.getMoves();
      should(moves).have.lengthOf(1)
      should(moves).deepEqual([{ x : 0, y : 0 }]);
    })
    it('should return 2 possible moves for the game', () => {
      let mapfield:MapField = new MapField();
      let p1:Player = new Player('1', 'X');

      mapfield.map = [
        ' XX',
        'XXX',
        'XX '
      ];
      let moves = mapfield.getMoves();
      should(moves).have.lengthOf(2)
      should(moves).deepEqual([
        { x : 0, y : 0 },
        { x : 2, y : 2 },
      ]);
    })
    it('should return 9 possible moves for the game', () => {
      let mapfield:MapField = new MapField();
      let moves = mapfield.getMoves();

      should(moves).have.lengthOf(9)
    })
  })
})
