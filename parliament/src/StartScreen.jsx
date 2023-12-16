import React from 'react';
import "./StartScreen.css"

function StartScreen({ onStartLobby }) {
  return (
    <div className="con animate pop">
      <h1>Welcome to Parliament!</h1>
      <button onClick={onStartLobby}>Start Lobby</button>
    </div>
  );
}

export default StartScreen;