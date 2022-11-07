import React from 'react';
import TopPlayerTable from './TopPlayerTable';
import SidePlayerTable from './SidePlayerTable';
import clamp from '../utils/clamp';

export default function Oponents({ socket, allPlayersInfo, knownRoles, currentRoom, activateCharacter, selectCardTarget, selectPlayerTarget, username, currentPlayer, 
    characterUsable, confirmCardTarget, playersInRange, confirmPlayerTarget}) {
        
    const playerIndex = allPlayersInfo.findIndex(player => {
        return (player.name === username);
    });

    console.log(clamp(playerIndex + 0, allPlayersInfo.length - 1));
    console.log(clamp(playerIndex + 1, allPlayersInfo.length - 1));
    console.log(clamp(playerIndex + 2, allPlayersInfo.length - 1));

    
    const oponentsInfo = allPlayersInfo.filter(player => {
        return (player.name !== username);
    });
    console.log("oponentsInfo: ", oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)]);


    if (oponentsInfo.length === 1) {
        return (
          <div className='min-w-[420px] md:min-w-[600px] w-full z-50'>
              <TopPlayerTable
                socket={socket}
                cardsInHand={new Array(oponentsInfo[0].numberOfCards).fill(0)}
                table={oponentsInfo[0].table}
                oponentName={oponentsInfo[0].name}
                currentRoom={currentRoom}
                activateCharacter={activateCharacter}
                selectCardTarget={selectCardTarget}
                selectPlayerTarget={selectPlayerTarget}
                confirmCardTarget={confirmCardTarget}
                currentPlayer={currentPlayer}
                username={username}
                character={oponentsInfo[0].character}
                characterUsable={characterUsable}
                health={oponentsInfo[0].health}
                playersInRange={playersInRange}
                confirmPlayerTarget={confirmPlayerTarget}
              />
          </div>
        )
    }

    if (oponentsInfo.length === 3) {
        return (
            <div className=''>
                <div className='fixed z-10 flex items-end justify-center min-h-[352px] w-[490px] left-[-70px] top-[50px] xs:top-[200px] rotate-90 '>
                    <SidePlayerTable
                        socket={socket}
                        cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
                        table={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].table}
                        oponentName={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].name}
                        currentRoom={currentRoom}
                        activateCharacter={activateCharacter}
                        selectCardTarget={selectCardTarget}
                        selectPlayerTarget={selectPlayerTarget}
                        confirmCardTarget={confirmCardTarget}
                        currentPlayer={currentPlayer}
                        username={username}
                        character={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].character}
                        role={knownRoles[oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].name]}
                        characterUsable={characterUsable}
                        health={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].health}
                        playersInRange={playersInRange}
                        confirmPlayerTarget={confirmPlayerTarget}
                        rotateDescription={-90}
                    />
                </div>
                <div className='flex justify-center fixed top-0 left-0 right-0 mx-auto z-5'>
                    <div className='w-[420px] xs:w-[820px]'>                        
                    <TopPlayerTable
                            socket={socket}
                            cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
                            table={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].table}
                            oponentName={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].name}
                            currentRoom={currentRoom}
                            activateCharacter={activateCharacter}
                            selectCardTarget={selectCardTarget}
                            selectPlayerTarget={selectPlayerTarget}
                            confirmCardTarget={confirmCardTarget}
                            currentPlayer={currentPlayer}
                            username={username}
                            character={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].character}
                            role={knownRoles[oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].name]}
                            characterUsable={characterUsable}
                            health={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].health}
                            playersInRange={playersInRange}
                            confirmPlayerTarget={confirmPlayerTarget}
                        />
                    </div>
                </div>
                <div className='fixed flex items-end justify-center min-h-[352px] w-[490px] right-[-70px] top-[50px] xs:top-[200px] rotate-[270deg]'>
                    <SidePlayerTable
                        socket={socket}
                        cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
                        table={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].table}
                        oponentName={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].name}
                        currentRoom={currentRoom}
                        activateCharacter={activateCharacter}
                        selectCardTarget={selectCardTarget}
                        selectPlayerTarget={selectPlayerTarget}
                        confirmCardTarget={confirmCardTarget}
                        currentPlayer={currentPlayer}
                        username={username}
                        character={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].character}
                        role={knownRoles[oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].name]}
                        characterUsable={characterUsable}
                        health={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].health}
                        playersInRange={playersInRange}
                        confirmPlayerTarget={confirmPlayerTarget}
                        rotateDescription={90}
                    />
                </div>
            </div>
        )
    }
}
