class Game {
    constructor(playerNames) {
        this.numOfPlayers = playerNames.length;
        this.deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.stack = [];
        this.players = {}
        this.playerRoundId = 0;

        // init players
        for (let i = 0; i < this.numOfPlayers; i++) {
            this.players[i] = {
                name: playerNames[i],
                hand: [],
                table: [],
                role: null,
                character: {
                    startingHandSize: 4
                }
            }
        }
    }

    draw(numToDraw, playerId = this.playerRoundId) {
        // put nomToDraw cards into hand of current playerRoundId
        // remove top card from deck
        if (this.deck.length <= 0) {
            console.log("DECK EMPTY!");
            this.putStackIntoDeck();
        }
        for (let i = 0; i < numToDraw; i++) {
            this.players[playerId].hand.push(this.deck[0]);
            this.deck.shift();
        }
        console.log(`Player ${this.players[playerId].name} drew ${numToDraw} cards`);
    }

    useCard(playerId, cardName) {
        // remove card from playerId hand and place it to the end of stack
        if(!this.players[playerId].hand.includes(cardName)) {
            // if card not in hand, return
            console.log("not in hand");
            return;
        };
        // remove card from hand
        const cardIndex = this.players[playerId].hand.indexOf(cardName);
        this.players[playerId].hand.splice(cardIndex, 1);
        // place card on deck
        this.stack.push(cardName);

        console.log(`Player ${this.players[playerId].name} used ${cardName}`);
    }

    shuffleDeck() {
        let currentIndex = this.deck.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.deck[currentIndex], this.deck[randomIndex]] = [
            this.deck[randomIndex], this.deck[currentIndex]];
        }

        console.log("Deck shuffled");
    }

    putStackIntoDeck() {
        this.deck = this.stack;
        this.stack = []
     
        console.log("Stack shuffled into deck");
     
        this.shuffleDeck();
    }

    startGame() {
        // each player draws startingHandSize cards
        //this.shuffleDeck(); // TODO: uncomment
        for (let i = 0; i < this.numOfPlayers; i++) {
            this.draw(this.players[i].character.startingHandSize, i);
        }

        console.log("Game started!");
    }

    endTurn() {
        // move playerRoundId forward
        this.playerRoundId += 1;
        if (this.playerRoundId >= this.numOfPlayers) {
            this.playerRoundId = 0;
        }

        console.log("End of turn");
    }

    getNumOfCardsInEachHand() {
        let state = {}
        for (let i = 0; i < this.numOfPlayers; i++) {
            state[i] = {handSize: this.players[i].hand.length}
        }
        return state;
    }

    getDeck() {
        return this.deck;
    }

    getPlayers() {
        return this.players;
    }
}

module.exports = Game;