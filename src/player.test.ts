import * as should from 'should';
import 'mocha';

import { Player } from './player';

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
