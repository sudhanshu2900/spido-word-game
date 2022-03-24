import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

function GameoverPage() {

  const location = useLocation();

  return (
    <>  
        <div className="container">
          <div className="leaderHeader">
            <div className="homeLogo">
              <Link to='/'>🏠</Link>
            </div>
                  
            <div className="leaderboardLogo">
              <Link to='/leaderboard'>🏆</Link>
            </div>
          </div>
          <div class="gameoverContainer">
              <h1>Game Over</h1>
              <h3>Your score is</h3>
              <h2>{location.state.finalScore}</h2>
              <h3>with power</h3>
              <h2>{location.state.finalPower}X</h2>
          </div>
        </div>
    </>
  )
}

export default GameoverPage
    