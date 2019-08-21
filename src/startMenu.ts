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
        this.show()
    }

    onGameStart() : void {
        this.circleBtn.removeEventListener("click", () => {
            this.buttonClicked(Team.Circle)
        });
        this.crossBtn.removeEventListener("click", () => {
            this.buttonClicked(Team.Cross)
        });
        this.next = true;

        for(let i = 0; i < this.plays.length; i++) {
            this.plays[i].addEventListener('click', this.playerMove)
        }
    }

    playerMove = (event: Event) =>  {
        const { target } = event;
        const playable = document.querySelectorAll(".playable");
        const playerSign : string = this.teamClicked == 0 ? 'x' : 'o';
        const compSign : string = this.teamClicked == 0 ? 'o' : 'x';

        (<HTMLInputElement>target).innerHTML = playerSign;
        (<HTMLInputElement>target).classList.add('class-' + playerSign);
        (<HTMLInputElement>target).classList.remove('playable');
        this.checker();
        if(playable.length && this.next) {
            setTimeout(() => {
                this.compMove(compSign)
            }, 500);
        }
    }

    private compMove(compSign : string) : void {
        let randIndex : number =  Math.floor(Math.random() * this.plays.length);
        while (this.plays[randIndex].innerHTML === 'x'  || this.plays[randIndex].innerHTML === 'o') {
            randIndex = Math.floor(Math.random() * this.plays.length);
        }
        this.plays[randIndex].innerHTML = compSign;
        this.plays[randIndex].classList.add('class-' + compSign);
        this.plays[randIndex].classList.remove('playable');
        this.checker();
    }

    // end game checker (win, lose, tie)
    private checker(): void {
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

    private reset(msg : string) : void {

        setTimeout(() => {
            alert(msg);
            for (let i=0; i < this.plays.length; i++) {
                this.plays[i].classList.add("playable");
                this.plays[i].classList.remove("class-x");
                this.plays[i].classList.remove("class-o");
                this.plays[i].innerHTML = "";
            }
            this.board.classList.add('hidden');
            this.parentElem.appendChild(this.menu);
        }, 500);
    }

    private buttonClicked(teamClicked : Team){
        this.teamClicked = teamClicked;
        this.board.classList.remove('hidden');
        this.onGameStart();
        this.close();
    }

    close() : void {
        this.parentElem.removeChild(this.menu);
        this.hidden = true
    }

    show() : void {
        this.circleBtn.addEventListener("click", () => {
            this.buttonClicked(Team.Circle)
        });
        this.crossBtn.addEventListener("click", () => {
            this.buttonClicked(Team.Cross)
        });
        this.hidden = false
    }
}
