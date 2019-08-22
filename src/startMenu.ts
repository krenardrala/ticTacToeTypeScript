import { Team } from "./consts"
import { Game } from "./game";

export class StartMenu {
    parentElem : HTMLElement;
    circleBtn !: HTMLElement;
    crossBtn !: HTMLElement;
    menu !: HTMLElement;
    plays !: NodeListOf<HTMLElement>;
    board !: HTMLElement;

    constructor(parentElem : HTMLElement){
        this.parentElem = parentElem;
        this.plays =  document.querySelectorAll(".play");
        this.board = document.querySelector(".board");
        this.menu = document.querySelector(".menu");
        this.circleBtn = document.querySelector(".circle-btn");
        this.crossBtn = document.querySelector(".cross-btn");
        this.show()
    }

    //Add event listeners to Menu buttons
    show() : void {
        this.circleBtn.addEventListener("click", () => {
            this.buttonClicked(Team.Circle)
        });
        this.crossBtn.addEventListener("click", () => {
            this.buttonClicked(Team.Cross)
        });
    }

    //Init Game start and call close menu method
    private buttonClicked(teamClicked : Team){
        this.board.classList.remove('hidden');
        this.onGameStart(teamClicked);
        this.close();
    }

    //Game start
    onGameStart(teamClicked: Team) : void {
        this.circleBtn.removeEventListener("click", () => {
            this.buttonClicked(Team.Circle)
        });
        this.crossBtn.removeEventListener("click", () => {
            this.buttonClicked(Team.Cross)
        });

        const game = new Game(teamClicked, this.parentElem);

        this.plays.forEach((play)=> {
            play.addEventListener('click', game.playerMove);
        })
    }

    //Close Start Menu
    close() : void {
        this.parentElem.removeChild(this.menu);
    }

}
