import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LeaderboardPage() {
  const [score, setScore] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://django-auth.azurewebsites.net/leaderboard`
      );
      setScore([...res.data]);
    }
    getData();
  });

  return (
    <>
      <div class="leaderContainer">
        <div class="leaderHeader">
          <div class="logo">
            <Link to="/">🏠</Link>
          </div>
          <div class="medalImage">
            <img src="medals.jpg" width="400px" alt="medals" />
          </div>
          <div class="line">-</div>
        </div>

        <div class="leaderTopHeading">
          <h1>LEADERBOARD</h1>
        </div>

        <div class="leaderTable">
          <table>
            <tr>
              <th>NAME</th>
              <th>MAX SCORE</th>
              <th>MAX POWER GAIN</th>
            </tr>

            {score.length > 0 &&
              score.map((scr, i) => {
                return (
                  <tr>
                    <td>{scr.name}</td>
                    <td>{scr.score}</td>
                    <td>{scr.power}X</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
}

export default LeaderboardPage;
