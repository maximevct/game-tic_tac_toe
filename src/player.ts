import { MapField, Move } from './mapfield';

export class Player {
  private _name:string;

  constructor(name:string) {
    this._name = name;
  }

  get name(): string { return this._name; }

  play(map:MapField):Move {
    return { x: 1, y : 1};
  }
}

export class IA extends Player {
  constructor(name:string, opponent:Player) { 
    super(name) 
  };

  play(map:MapField):Move {
    let possibleMoves:Move[] = map.getMoves();

    return possibleMoves[0];
  }
}