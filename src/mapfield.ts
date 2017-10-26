import { Player } from './player';

export interface Move {
  x:number,
  y:number
}

export class MapField {
  private _map:string[] = [
    '   ',
    '   ',
    '   ',
  ];

  constructor() {}

  get map():string[] { return this._map }
  set map(map:string[]) { this._map = map }

  public display():void {
    console.log('╔═══╦═══╦═══╗')
    this.map.map((line, i) => {
      console.log('║ ' + line.split('').join(' ║ ') + ' ║');
      if (i + 1 < this.map.length) {
        console.log('╠═══╬═══╬═══╣')
      }
    })
    console.log('╚═══╩═══╩═══╝')
  }

  private placeCharInStringAt(s:string, i:number, sr:string):string {
    return s.substring(0, i) + sr + s.substring(i + 1);
  }

  public play(m:Move, p:Player):boolean {
    if ( m.y >= this.map.length      || m.y < 0
      || m.x >= this.map[m.y].length || m.x < 0
      || this.map[m.y][m.x] !== ' ')  {
      return false;
    }
    this.map[m.y] = this.placeCharInStringAt(this.map[m.y], m.x, p.char);
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
        if (this.map[y][x] === ' ') {
          moves.push({y, x})
        }
      }
    }
    return moves;
  }

  private scoreLines(p:Player):number {
    return this.map.reduce(
      (sum:number, l:string):number => 
        sum + (l.split('').filter(
          (col:string):boolean => 
            col === p.char).length === 3 ? 10 : 0), 0);
  }

  private scoreDiags(p:Player):number {
    let s:number = 0;
    let x:number = 0;
    let y:number = 0;
    let w:boolean = true;

    for (; y < this.map.length && x < this.map[y].length; y++, x++) {
      if (this.map[y][x] != p.char) {
        w = false;
      }
    }
    s += w ? 10 : 0;
    w = true;
    for (x = this.map[0].length - 1, y = 0; y < this.map.length && x >= 0; y++, x--) {
      if (this.map[y][x] !== p.char) {
        w = false;
      }
    }
    s += w ? 10 : 0;
    return s;
  }

  private scoreColumns(p:Player):number {
    let s:number = 0;
    for (let x:number = 0; x < this.map[0].length; x++) {
      if (this.map[0][x] === p.char) {
        let w:boolean = true;
        for (let y:number = 1; y < this.map.length; y++) {
          if (this.map[y][x] !== p.char) {
            w = false;
            break;
          }
        }
        s += w ? 10 : 0;
      }
    }
    return s;
  }
}
