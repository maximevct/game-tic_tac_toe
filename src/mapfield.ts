import { Player } from './player';

export class MapField {
  private _map: Player[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  constructor() {}

  get map():Player[][] { return this._map }
  set map(map:Player[][]) { this._map = map }

  public display(): void {
    console.log('\x1Bc');
    console.log('Tic Tac Toe')
    console.log('╔═══╦═══╦═══╗')
    this._map.map((line, i) => {
      console.log('║ ' + line.map((p) => p ? p.name : ' ').join(' ║ ') + ' ║');
      if (i + 1 < this._map.length) {
        console.log('╠═══╬═══╬═══╣')
      }
    })
    console.log('╚═══╩═══╩═══╝')
  }

  public play(y:number, x:number, p:Player): boolean {
    if ( y >= this._map.length    || y < 0
      || x >= this._map[y].length || x < 0
      || this._map[y][x] !== null)  {
      return false;
    }
    this._map[y][x] = p;
    return true;
  }

  public score(p:Player): number {
    return this.scoreLines(p)
      + this.scoreColumns(p)
      + this.scoreDiags(p);
  }

  private scoreLines(p:Player) : number {
    return this._map.reduce((sum:number, l:Player[]):number => sum + (l.filter((col:Player) : boolean => col === p).length === 3 ? 1 : 0), 0);
  }

  private scoreDiags(p:Player):number {
    let s:number = 0;
    let x:number = 0;
    let y:number = 0;
    let w:boolean = true;

    for (; y < this._map.length && x < this._map[y].length; y++, x++) {
      if (this._map[y][x] != p) {
        w = false;
      }
    }
    s += w ? 1 : 0;
    w = true;
    for (x = this._map[0].length - 1, y = 0; y < this._map.length && x >= 0; y++, x--) {
      if (this._map[y][x] != p) {
        w = false;
      }
    }
    s += w ? 1 : 0;
    return s;
  }

  private scoreColumns(p:Player) : number {
    let s:number = 0;
    for (let x:number = 0; x < this._map[0].length; x++) {
      if (this._map[0][x] == p) {
        let w:boolean = true;
        for (let y:number = 1; y < this._map.length; y++) {
          if (this._map[y][x] != p) {
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
