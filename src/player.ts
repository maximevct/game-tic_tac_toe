import { MapField, Move } from './mapfield';

interface WMove {
  move:Move;
  w:number;
}

export class Player {
  private _name:string;
  private _char:string;

  constructor(name:string, char:string) {
    this._name = name;
    this._char = char;
  }

  get name():string { return this._name; }
  get char():string { return this._char; }
  
  public play(map:MapField):Move {
    return { x: 1, y : 1};
  }
}

export class IA extends Player {
  constructor(name:string, char:string, private _opponent:Player) { 
    super(name, char); 
  };

  public play(map:MapField):Move {
    let wmoves:WMove[] = [];
    let moves:Move[] = map.getMoves();

    let oldMap:string[] = JSON.parse(JSON.stringify(map.map));
    console.log(oldMap);
    for (let i:number = 0; i < moves.length; i++) {
      console.log(i, moves[i]);
      map.map = JSON.parse(JSON.stringify(oldMap));
      console.log(oldMap);
      let wmove = this.minmax(map, moves[i], moves.slice(0), 0, true, { move : moves[i], w : 0});
      console.log(wmove);
      wmoves.push(wmove);
    }
    wmoves.sort((a, b) => b.w - a.w);
    console.log(wmoves);
    return wmoves[0].move;
  }
  
  private minmax(map:MapField, move:Move, moves:Move[], depth:number, myTurn:boolean, wmove:WMove):WMove {
    let player:Player = myTurn ? this : this._opponent;
    if (!moves.length) {
      return wmove;
    }
    map.play(move, player);
    wmove.w += (map.score(player) * (myTurn ? 1 : -1)) - depth;
    return this.minmax(map, moves.pop(), moves, ++depth, !myTurn, wmove);
  }
}