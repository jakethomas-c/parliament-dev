import React, { useState, useEffect } from 'react';
import prompts from './prompts.json';
import LobbyScreen from './LobbyScreen'; // Import your LobbyScreen component

function GameScreen({ team1, team2, onReturnToLobby }) {
  const [prompt, setPrompt] = useState('');
  const [team1Status, setTeam1Status] = useState('');
  const [team2Status, setTeam2Status] = useState('');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [winner, setWinner] = useState(null);
  const [usedPrompts, setUsedPrompts] = useState([]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    generatePrompt();
  }, []);

  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          clearInterval(interval);
          checkWinner();
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, isTimerRunning]);

  const generatePrompt = () => {
    if (usedPrompts.length === prompts.length) {
      // All prompts have been used, reset usedPrompts array
      setUsedPrompts([]);
    }

    // Filter out used prompts
    const availablePrompts = prompts.filter((prompt) => !usedPrompts.includes(prompt.prompt));
    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    const randomPrompt = availablePrompts[randomIndex];

    setPrompt(randomPrompt.prompt);

    const isTeam1For = Math.random() < 0.5;
    setTeam1Status(isTeam1For ? 'For' : 'Against');
    setTeam2Status(isTeam1For ? 'Against' : 'For');

    // Add the used prompt to the usedPrompts array
    setUsedPrompts([...usedPrompts, randomPrompt.prompt]);

    // Reset the timer
    setTimer(60);
    setIsTimerRunning(false);
  };

  const handleScoreTeam1 = () => {
    setTeam1Score(team1Score + 1);
    checkWinner();
    triggerAnimation('team1Status');
    triggerAnimation('team2Status');
  };

  const handleScoreTeam2 = () => {
    setTeam2Score(team2Score + 1);
    checkWinner();
    triggerAnimation('team2Status');
    triggerAnimation('team1Status');
  };

  const triggerAnimation = (elementId) => {
    const element = document.getElementById(elementId);
    element.classList.remove('animate pop');
    void element.offsetWidth; // Trigger reflow to restart the animation
    element.classList.add('animate pop');
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimer(60);
  };

  const checkWinner = () => {
    if (team1Score >= 4) {
      setWinner('Team 1');
    } else if (team2Score >= 4) {
      setWinner('Team 2');
    } else {
      generatePrompt();
    }
  };

  const resetGame = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setUsedPrompts([]);
    generatePrompt();
  };

  return (
    <div className="con animate pop">
      {winner ? (
        <div>
          <h1>Winner: {winner}</h1>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div>
          <h1>Game Screen</h1>
          <div className='div'>
            <h2 className="animate pop prompt">{prompt}</h2>
            <div>
              <h3 id="team1Status" className="animate pop score">Team 1: {team1Status}</h3>
              <button onClick={handleScoreTeam1}>Score Team 1</button>
              <p className='score'>Score: {team1Score}</p>
            </div>
            <div>
              <h3 id="team2Status" className="animate pop score">Team 2: {team2Status}</h3>
              <button onClick={handleScoreTeam2}>Score Team 2</button>
              <p className='score'>Score: {team2Score}</p>
            </div>
          </div>
         <div>
            {isTimerRunning ? (
              <p className='score timer'>Timer: {timer} seconds</p>
            ) : (
              <button onClick={handleStartTimer}>Start Timer</button>
            )}
            {isTimerRunning && (
              <button onClick={handleResetTimer}>Reset Timer</button>
            )}
            <button onClick={generatePrompt}>Generate Prompt</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameScreen;