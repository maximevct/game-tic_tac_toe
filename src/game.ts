import { Player   } from './player';
import { MapField } from './mapfield';

export class Game {
  private _name     :string   = 'Tic Tac Toe';
  private _players  :Player[] = [];
  private _map      :MapField = new MapField(); 
  private _posReader:() => void;
  public  verbose   :boolean  = true;

  constructor(...players:Player[]) {
    this._players = players;
  }

  get name():string      { return this._name    }
  get players():Player[] { return this._players }

  play():Player {
    let i:number = 0;

    while (this._map.getMoves().length > 0 
        && this._map.score(this.players[i]) === 0) {
      i++;
      if (i === this._players.length) {
        i === 0;
      }
    }
    return this._map.score(this.players[i]) ? this._players[i] : null;
  }
}
