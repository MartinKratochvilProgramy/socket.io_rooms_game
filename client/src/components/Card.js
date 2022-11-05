import React from 'react'

export default function Card({ socket, card, setActiveCard, setSelectPlayerTarget, setSelectCardTarget, currentRoom, username, currentPlayer, duelActive, indianiActive, discarding, character, onClick }) {

    // TODO: this is not necessary
    const isPlayable = card.isPlayable
    const cardName = card.name;
    const cardDigit = card.digit;
    const cardType = card.type;

    function handleClick() {

      if (onClick !== undefined) {
        onClick();
        return;
      }
      
      if (discarding) {
        socket.emit("discard", {username, currentRoom, card});
        return;
      }

      if (!isPlayable) return;
        
      if (cardName === "Bang!") {
        if (username !== currentPlayer && character === "Calamity Janet") {
          socket.emit("play_bang_as_CJ", {username, currentRoom, cardDigit, cardType});

        } else if (!duelActive && !indianiActive) {
          setActiveCard(card);
          setSelectPlayerTarget(true);
          socket.emit("request_players_in_range", {range: 1, currentRoom, username});

        } else if (indianiActive) {
          console.log("Bang on indiani");
          socket.emit("play_bang_on_indiani", {username, currentRoom, cardDigit, cardType});

        } else if (duelActive) {
          console.log("Bang in duel");
          socket.emit("play_bang_in_duel", {username, currentRoom, cardDigit, cardType});
        }

      } else if (cardName === "Mancato!") {
        if (username === currentPlayer && character === "Calamity Janet") {
          setActiveCard(card);
          setSelectPlayerTarget(true);
          socket.emit("request_players_in_range", {range: 1, currentRoom, username});
        } else if (duelActive){
          socket.emit("play_mancato_in_duel", {username, currentRoom, cardDigit, cardType});
        } else {
          socket.emit("play_mancato", {username, currentRoom, cardDigit, cardType});
        }

      } else if (cardName === "Beer") {
        socket.emit("play_beer", {username, currentRoom, cardDigit, cardType});

      } else if (cardName === "Saloon") {
        socket.emit("play_saloon", {username, currentRoom, cardDigit, cardType});

      } else if (cardName === "Emporio") {
        socket.emit("play_emporio", {username, currentRoom, cardDigit, cardType});

      } else if (cardName === "Diligenza") {
        socket.emit("play_diligenza", {username, currentRoom, cardDigit, cardType});

      } else if (cardName === "Wells Fargo") {
        socket.emit("play_wellsfargo", {username, currentRoom, cardDigit, cardType});

      } else if (cardName === "Gatling") {
        socket.emit("play_gatling", {username, currentRoom, cardDigit, cardType});

      } else if (cardName === "Indiani") {
        socket.emit("play_indiani", {username, currentRoom, cardDigit, cardType});

      } else if (cardName === "Duel") {
        setActiveCard(card);
        setSelectPlayerTarget(true);
        socket.emit("request_players_in_range", {range: "max", currentRoom, username});

      } else if (cardName === "Cat Balou") {
        setActiveCard(card);
        setSelectPlayerTarget(true);
        setSelectCardTarget(true);
        socket.emit("request_players_in_range", {range: "max", currentRoom, username});
        
      } else if (cardName === "Panico") {
        setActiveCard(card);
        setSelectPlayerTarget(true);
        setSelectCardTarget(true);
        socket.emit("request_players_in_range", {range: "one_not_gun", currentRoom, username});
      
      } else if (card.rimColor === "blue" && card.name !== "Prigione") {
        socket.emit("place_blue_card_on_table", {username, currentRoom, card});

      } else if (card.name === "Prigione") {
        setActiveCard(card);
        setSelectPlayerTarget(true);
        socket.emit("request_players_in_range", {range: "max_not_sheriffo", currentRoom, username});
      }
    }

    let styles = {cursor: "auto"};
    if (isPlayable) {
      styles = {color: "red", border: "solid 1px red", cursor: "pointer"}
    } 
    if (discarding) {
      styles = {color: "red", border: "solid 1px red"}
    } 

    const cardSource = require("../img/gfx/cards/" + cardName.replace(/!/, '').replace(/\s/, '') + ".png");

  return (
    <button 
      onClick={handleClick} 
      style={styles} 
      className='w-[60px] xs:w-[80px]'>
      <img src={cardSource} alt="" />
        {/* {cardName} <br /> {cardDigit} {cardType} */}
    </button>
  )
}
