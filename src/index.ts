import { MapField } from './mapfield';
import { Player } from './player';

let mapfield:MapField = new MapField();

import * as readline from 'readline';

const cl = readline.createInterface({
  input  : process.stdin,
  output : process.stdout
});

let players:Player[] = [new Player('X'), new Player('O')];
let iPlayer:number = 0;

function makePrompt ():void {
  let p:string = `Player [${players[iPlayer].name}] (line col)> `;
  cl.setPrompt(p);
};
function togglePlayer ():void { iPlayer += iPlayer === 1 ? -1 : 1; }

mapfield.display();
makePrompt();
cl.prompt();

cl.on('line', (line:string) => {
  let pos:number[] = line.split(' ').map((c) => parseInt(c, 10) - 1);
  if (!mapfield.play(pos[0], pos[1], players[iPlayer])) {
    console.log('ERROR: You cannot play this case');
  }
  else {
    mapfield.display();
    if (mapfield.score(players[iPlayer]) > 0) {
      console.log('Player [%s] won !', players[iPlayer].name);
      process.exit(0);
    }
    togglePlayer();
    makePrompt();
  }
  cl.prompt();
});

cl.on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
