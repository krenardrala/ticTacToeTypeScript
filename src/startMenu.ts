import{ Team } from "./consts"

export class StartMenu {

    parentElem : HTMLElement;
    circleBtn !: HTMLElement;
    crossBtn !: HTMLElement;
    menu !: HTMLElement;
    plays !: NodeListOf<HTMLElement>;
    board !: HTMLElement;
    teamClicked !: Team;
    next !: boolean;
    private hidden !: boolean;
    
    constructor(parentElem : HTMLElement){
        this.parentElem = parentElem;
        this.hidden = true;
        this.plays =  document.querySelectorAll(".play");
        this.board = document.querySelector(".board");
        this.menu = document.querySelector(".menu");
        this.circleBtn = document.querySelector(".circle-btn");
        this.crossBtn = document.querySelector(".cross-btn");
        this.next = true;
        this.teamClicked = 0;
        this.show()
    }

    onGameStart(teamClicked : Team) : void {
        this.circleBtn.removeEventListener("click", () => {
            this.buttonClicked(Team.Circle)
        });
        this.crossBtn.removeEventListener("click", () => {
            this.buttonClicked(Team.Cross)
        });
        this.next = true;
        this.playerMove(teamClicked);
    }

    private playerMove(teamClicked : Team) : void {
        const localTeamClicked : Team = teamClicked;
        const playable = document.querySelectorAll(".playable");
        const chooseClass : string = teamClicked == 0 ? 'class-x' : 'class-o';
        const oppositePlayer : string = teamClicked == 0 ? 'class-o' : 'class-x';

        for(let i = 0; i < this.plays.length; i++) {
            this.plays[i].addEventListener('click', () => {

                this.plays[i].classList.add(chooseClass);
                this.plays[i].classList.remove('playable');
                this.checker(localTeamClicked);
                if(playable.length && this.next) {
                    this.compMove(oppositePlayer, localTeamClicked);
                }
            });
        }
    }

    private compMove(oppositePlayer : string, teamClicked : Team) : void {
        let randIndex : number =  Math.floor(Math.random() * this.plays.length);
        while (this.plays[randIndex].classList.contains('class-x')  || this.plays[randIndex].classList.contains('class-o')) {
            randIndex = Math.floor(Math.random() * this.plays.length);
        }
        this.plays[randIndex].classList.add(oppositePlayer);
        this.plays[randIndex].classList.remove('playable');
        this.checker(teamClicked);
    }

    // end game checker (win, lose, tie)
    private checker(teamClicked : Team): void {
        const playerSign = teamClicked == 0 ? 'class-x' : 'class-o';
        const compSign = teamClicked == 0 ? 'class-o' : 'class-x';
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

    private reset(msg : string) : void {
        //this.hidden = false;
        alert(msg);

        for (let i=0; i < this.plays.length; i++) {
            this.plays[i].classList.add("playable");
            this.plays[i].classList.remove("class-x");
            this.plays[i].classList.remove("class-o");
            //this.plays[i].removeEventListener("click", () => {});
        }
        this.board.classList.add('hidden');
        this.parentElem.appendChild(this.menu);
        //this.show();
    }

    private buttonClicked(teamClicked : Team){
        this.board.classList.remove('hidden');
        this.onGameStart(teamClicked);
        this.close();
    }

    close() : void {
        /*if(this.hidden)
            return*/

        this.parentElem.removeChild(this.menu);
        this.hidden = true
    }

    show() : void {
        /*if(!this.hidden)
            return*/

        this.circleBtn.addEventListener("click", () => {
            this.buttonClicked(Team.Circle)
        });
        this.crossBtn.addEventListener("click", () => {
            this.buttonClicked(Team.Cross)
        });

        this.hidden = false
    }
}
