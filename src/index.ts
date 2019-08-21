import{ Team } from "./consts"
import{ StartMenu } from "./startMenu"

let gameElem = document.getElementById("app") as HTMLElement;

let startMenu = new StartMenu(gameElem);

/*startMenu.onGameStart((choice: Team) => {
    //game.startGame(choice)
});*/

