export class MapField {
  private map: string[][] = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  constructor() {}

  public display(): void {
    console.log('\x1Bc');
    console.log('Tic Tac Toe')
    console.log('╔═══╦═══╦═══╗')
    this.map.map((line, i) => {
      console.log('║ ' + line.join(' ║ ') + ' ║');
      if (i + 1 < this.map.length) {
        console.log('╠═══╬═══╬═══╣')
      }
    })
    console.log('╚═══╩═══╩═══╝')
  }

  public play(x:number, y:number, c:string): boolean {
    if ( y > this.map.length    || y < 0
      || x > this.map[y].length || x < 0
      || this.map[y][x] !== ' ')  {
      return false;
    }
    this.map[y][x] = c;
    return true;
  }

  public score(c:string): number {
    return this.scoreLines(c)
      + this.scoreColumns(c)
      + this.scoreDiags(c);
  }

  private scoreLines(c:string) : number {
    return this.map.reduce((sum:number, l:string[]):number => sum + (l.filter((col:string) : boolean => col === c).length === 3 ? 1 : 0), 0);
  }

  private scoreDiags(c:string):number {
    let s:number = 0;
    let x:number = 0;
    let y:number = 0;
    let w:boolean = true;

    for (; y < this.map.length && x < this.map[y].length; y++, x++) {
      if (this.map[y][x] !== c) {
        w = false;
      }
    }
    s += w ? 1 : 0;
    w = true;
    for (x = this.map[0].length - 1, y = 0; y < this.map.length && x > 0; y++, x--) {
      if (this.map[y][x] !== c) {
        w = false;
      }
    }
    s += w ? 1 : 0;
    return s;
  }

  private scoreColumns(c:string) : number {
    let s:number = 0;
    for (let x:number = 0; x < this.map[0].length; x++) {
      if (this.map[0][x] === c) {
        let w:boolean = true;
        for (let y:number = 1; y < this.map.length; y++) {
          if (this.map[y][x] !== c) {
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
