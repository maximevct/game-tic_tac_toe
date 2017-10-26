import * as should from 'should';
import 'mocha';

import { Player } from './player';
import { Game   } from './game';

describe('Game', () => {
  describe('Init', () => {
    it('should create a new Tic Tac Toe Game', () => {
      let p1:Player = new Player('1', 'X');
      let p2:Player = new Player('2', '0');
      let g:Game    = new Game(p1, p2);

      should(g).be.ok();
    })
  })
  describe('Get name', () => {
    it('should get the name of the game', () => {
      let p1:Player = new Player('1', 'X');
      let p2:Player = new Player('2', '0');
      let g:Game    = new Game(p1, p2);

      should(g.name).equal('Tic Tac Toe');
    })
  })
  describe('Get players', () => {
    it('should get the players of the game', () => {
      let p1:Player = new Player('1', 'X');
      let p2:Player = new Player('2', '0');
      let g:Game    = new Game(p1, p2);

      should(g.players).have.lengthOf(2);
      should(g.players[0].name).equal('1');
      should(g.players[1].name).equal('2');
    })
  })
  describe('Verbose setting', () => {
    it('should get the default verbose setting', () => {
      let p1:Player = new Player('1', 'X');
      let p2:Player = new Player('2', '0');
      let g:Game    = new Game(p1, p2);

      should(g.verbose).be.true();
    })
    it('should modify the verbose setting', () => {
      let p1:Player = new Player('1', 'X');
      let p2:Player = new Player('2', '0');
      let g:Game    = new Game(p1, p2);

      g.verbose = false;
      should(g.verbose).be.false();
    })
  })
})
