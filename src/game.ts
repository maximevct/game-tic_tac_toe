import { Player } from './player';

export class Game {
  private _name   :string   = 'Tic Tac Toe';
  private _players:Player[] = [];

  constructor(...players:Player[]) {
    this._players = players;
  }

  get name():string      { return this._name    }
  get players():Player[] { return this._players }
}
