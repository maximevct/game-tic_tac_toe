import { Player } from './player';

export interface Move {
  x:number,
  y:number
}

export class MapField {
  private _map:Player[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  constructor() {}

  get map():Player[][] { return this._map }
  set map(map:Player[][]) { this._map = map }

  public display():void {
    console.log('\x1Bc');
    console.log('Tic Tac Toe')
    console.log('╔═══╦═══╦═══╗')
    this.map.map((line, i) => {
      console.log('║ ' + line.map((p) => p ? p.name : ' ').join(' ║ ') + ' ║');
      if (i + 1 < this.map.length) {
        console.log('╠═══╬═══╬═══╣')
      }
    })
    console.log('╚═══╩═══╩═══╝')
  }

  public play(m:Move, p:Player):boolean {
    if ( m.y >= this.map.length      || m.y < 0
      || m.x >= this.map[m.y].length || m.x < 0
      || this.map[m.y][m.x] !== null)  {
      return false;
    }
    this.map[m.y][m.x] = p;
    return true;
  }

  public score(p:Player): number {
    return this.scoreLines(p)
      + this.scoreColumns(p)
      + this.scoreDiags(p);
  }

  public getMoves():Move[] {
    let moves:Move[] = [];

    for (let y:number = 0; y < this.map.length; y++) {
      for (let x:number = 0; x < this.map[y].length; x++) {
        if (!this.map[y][x]) {
          moves.push({y, x})
        }
      }
    }
    return moves;
  }

  private scoreLines(p:Player):number {
    return this.map.reduce(
      (sum:number, l:Player[]):number => 
        sum + (l.filter(
          (col:Player):boolean => 
            col === p).length === 3 ? 1 : 0), 0);
  }

  private scoreDiags(p:Player):number {
    let s:number = 0;
    let x:number = 0;
    let y:number = 0;
    let w:boolean = true;

    for (; y < this.map.length && x < this.map[y].length; y++, x++) {
      if (this.map[y][x] != p) {
        w = false;
      }
    }
    s += w ? 1 : 0;
    w = true;
    for (x = this.map[0].length - 1, y = 0; y < this.map.length && x >= 0; y++, x--) {
      if (this.map[y][x] != p) {
        w = false;
      }
    }
    s += w ? 1 : 0;
    return s;
  }

  private scoreColumns(p:Player):number {
    let s:number = 0;
    for (let x:number = 0; x < this.map[0].length; x++) {
      if (this.map[0][x] == p) {
        let w:boolean = true;
        for (let y:number = 1; y < this.map.length; y++) {
          if (this.map[y][x] != p) {
            w = false;
            break;
          }
        }
        s += w ? 1 : 0;
      }
    }
    return s;
  }
}
