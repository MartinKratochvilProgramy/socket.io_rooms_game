import React from 'react'

export default function Card({ socket, cardDigit, cardType, cardName, setActiveCard, setSelectPlayerTarget, currentRoom, isPlayable, username }) {

    function handleClick() {
        if (!isPlayable) return;
        
        if (cardName === "Bang!") {
            setActiveCard({name: "Bang!", cardDigit, cardType});
            if (isPlayable) {
                setSelectPlayerTarget(true);
                socket.emit("request_players_in_range", {range: 1, currentRoom, username});
            }

        } else if (cardName === "Mancato!") {
            socket.emit("play_mancato", {username, currentRoom, cardDigit, cardType});
        }
    }

    let styles;
    if (isPlayable) {
      styles = {color: "red"}
    } 

  return (
    <button onClick={handleClick} style={styles}>
        {cardName} <br /> {cardDigit} {cardType}
    </button>
  )
}
