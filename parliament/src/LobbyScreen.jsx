import React, { useState } from 'react';
import "./LobbyScreen.css"

function LobbyScreen({ onStartGame }) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const handleStartGame = () => {
    onStartGame();
  };

  return (
    <div className="con animate pop">
      <h1>Lobby</h1>
      <label>Team 1:</label>
      <input type="text" value={team1} onChange={(e) => setTeam1(e.target.value)} />
      <br/>
      <label>Team 2:</label>
      <input type="text" value={team2} onChange={(e) => setTeam2(e.target.value)} />
      <br />
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default LobbyScreen;