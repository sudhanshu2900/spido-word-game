import { Route, Routes } from "react-router-dom";

import GameoverPage from "./GameoverPage";
import Home from "./Home";
import LeaderboardPage from "./LeaderboardPage";
import MainPage from "./MainPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/main" element={<MainPage/>} />
      <Route path="/leaderboard" element={<LeaderboardPage/>} />
      <Route path="/gameover" element={<GameoverPage/>} />
    </Routes>
  );
}

export default App;
