import React, { useState } from 'react';
import StartScreen from './StartScreen';
import LobbyScreen from './LobbyScreen';
import GameScreen from './GameScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const handleStartLobby = () => {
    setCurrentScreen('lobby');
  };

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleReturnToLobby = () => {
    setCurrentScreen('lobby');
  };

  return (
    <div>
      {currentScreen === 'start' && <StartScreen onStartLobby={handleStartLobby} />}
      {currentScreen === 'lobby' && (
        <LobbyScreen team1={team1} team2={team2} onStartGame={handleStartGame} />
      )}
      {currentScreen === 'game' && (
        <GameScreen team1={team1} team2={team2} onReturnToLobby={handleReturnToLobby} />
      )}
    </div>
  );
}

export default App;