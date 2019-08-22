import{ Team } from "./consts"
import { CheckWinner } from "./checkWinner";

export class Game {
    parentElem !: HTMLElement;
    menu !: HTMLElement;
    plays !: NodeListOf<HTMLElement>;
    teamClicked !: Team;
    checker !: CheckWinner;

    constructor(teamClicked: Team, parentElem: HTMLElement){
        this.plays =  document.querySelectorAll(".play");
        this.menu = document.querySelector(".menu");
        this.teamClicked = teamClicked;
        this.parentElem = parentElem;
        this.checker = new CheckWinner(this.teamClicked, this.parentElem, this.menu);
    }

    //Player turn and check if there is a winner
    playerMove = (event: Event) =>  {
        const { target } = event;
        const playable = document.querySelectorAll(".playable");
        const playerSign : string = this.teamClicked == 0 ? 'x' : 'o';
        const compSign : string = this.teamClicked == 0 ? 'o' : 'x';

        (<HTMLInputElement>target).innerHTML = playerSign;
        (<HTMLInputElement>target).classList.add('class-' + playerSign);
        (<HTMLInputElement>target).classList.remove('playable');

        this.checker.checker();

        if(playable.length && this.checker.next) {
            setTimeout(() => {
                this.compMove(compSign)
            }, 500);
        } else {
            this.plays.forEach((play)=> {
                play.removeEventListener('click', this.playerMove);
            })
        }
    };

    //Computer turn and check if there is a winner
    private compMove(compSign : string) : void {
        let randIndex : number =  Math.floor(Math.random() * this.plays.length);
        while (this.plays[randIndex].innerHTML === 'x'  || this.plays[randIndex].innerHTML === 'o') {
            randIndex = Math.floor(Math.random() * this.plays.length);
        }
        this.plays[randIndex].innerHTML = compSign;
        this.plays[randIndex].classList.add('class-' + compSign);
        this.plays[randIndex].classList.remove('playable');
        this.checker.checker();
    }

}
