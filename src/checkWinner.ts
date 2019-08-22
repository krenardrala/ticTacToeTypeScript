import { Team } from "./consts"

export class CheckWinner {
    parentElem : HTMLElement;
    menu !: HTMLElement;
    plays !: NodeListOf<HTMLElement>;
    board !: HTMLElement;
    teamClicked !: Team;
    next !: boolean;

    constructor(teamClicked: Team, parentElement: HTMLElement, menu: HTMLElement){
        this.plays =  document.querySelectorAll(".play");
        this.board = document.querySelector(".board");
        this.menu = menu;
        this.teamClicked = teamClicked;
        this.parentElem = parentElement;
        this.next = true;
    }

    // end game checker (win, lose, tie)
    checker(): void {
        const playerSign = this.teamClicked == 0 ? 'class-x' : 'class-o';
        const compSign = this.teamClicked == 0 ? 'class-o' : 'class-x';
        const playable = document.querySelectorAll(".playable");

        // win
        if (((this.plays[0].classList.contains(playerSign) && this.plays[1].classList.contains(playerSign) && this.plays[2].classList.contains(playerSign))
            ||  (this.plays[3].classList.contains(playerSign) && this.plays[4].classList.contains(playerSign) && this.plays[5].classList.contains(playerSign))
            ||  (this.plays[6].classList.contains(playerSign) && this.plays[7].classList.contains(playerSign) && this.plays[8].classList.contains(playerSign))
            ||  (this.plays[0].classList.contains(playerSign) && this.plays[3].classList.contains(playerSign) && this.plays[6].classList.contains(playerSign))
            ||  (this.plays[1].classList.contains(playerSign) && this.plays[4].classList.contains(playerSign) && this.plays[7].classList.contains(playerSign))
            ||  (this.plays[2].classList.contains(playerSign) && this.plays[5].classList.contains(playerSign) && this.plays[8].classList.contains(playerSign))
            ||  (this.plays[0].classList.contains(playerSign) && this.plays[4].classList.contains(playerSign) && this.plays[8].classList.contains(playerSign))
            ||  (this.plays[2].classList.contains(playerSign) && this.plays[4].classList.contains(playerSign) && this.plays[6].classList.contains(playerSign))
        )) {
            this.next = false;
            this.reset('You win!');
        }
        //loose
        else  if (((this.plays[0].classList.contains(compSign) && this.plays[1].classList.contains(compSign) && this.plays[2].classList.contains(compSign))
            ||  (this.plays[3].classList.contains(compSign) && this.plays[4].classList.contains(compSign) && this.plays[5].classList.contains(compSign))
            ||  (this.plays[6].classList.contains(compSign) && this.plays[7].classList.contains(compSign) && this.plays[8].classList.contains(compSign))
            ||  (this.plays[0].classList.contains(compSign) && this.plays[3].classList.contains(compSign) && this.plays[6].classList.contains(compSign))
            ||  (this.plays[1].classList.contains(compSign) && this.plays[4].classList.contains(compSign) && this.plays[7].classList.contains(compSign))
            ||  (this.plays[2].classList.contains(compSign) && this.plays[5].classList.contains(compSign) && this.plays[8].classList.contains(compSign))
            ||  (this.plays[0].classList.contains(compSign) && this.plays[4].classList.contains(compSign) && this.plays[8].classList.contains(compSign))
            ||  (this.plays[2].classList.contains(compSign) && this.plays[4].classList.contains(compSign) && this.plays[6].classList.contains(compSign))
        )) {
            this.next = false;
            this.reset('You loose!')
        }
        // tie
        else if (playable.length === 0) {
            this.next  = false;
            this.reset('You tied!');
        }
    }

    //Reset the game in case of Winner
    private reset(msg : string) : void {
        setTimeout(() => {
            alert(msg);
            this.plays.forEach((play)=> {
                play.classList.add("playable");
                play.classList.remove("class-x");
                play.classList.remove("class-o");
                play.innerHTML = "";
            });
            this.board.classList.add('hidden');
            this.parentElem.appendChild(this.menu);
        }, 500);
    }

}
