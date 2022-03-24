import React, {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './style.css';

function Home() {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const toMain=()=>{
        navigate('/main',{state:{name: name}});
    }


  return (
    <>
        <div className="content">
            <div className="cont">
                <div className="head">
                    <p>SpidoWord</p>
                </div>
                <div className="name">
                    <p>Enter your name...</p>
                    <input type="input" className="form__field" name="name" id='name' onChange={(e) =>{setName(e.target.value);}} required />
                    <button id='submitName' onClick={toMain}>↩</button>
                </div>
            
                <button type='button' id='instructionBtn' onClick={()=>{
                    if(document.getElementById("instruct").style.display === "none"){
                        document.getElementById("instruct").style.display = "block";
                    }
                    else{
                        document.getElementById("instruct").style.display = "none";
                    } 
                }}><a href="#instruct">Instructions</a></button>       
            </div>  
        </div>

        <div className="instructions" id='instruct'>
            <h1>INSTRUCTIONS</h1>
            <ul style={{marginLeft:'-40px'}}>
                <li>👉 Must Enter your name before start the game.</li>
                <li>👉 You will recieving words one by one that you need to type.</li>
                <li>👉 Game will over if you type 10 incorrect words.</li>
                <li>👉 You will get incorrect words in a box at center of screen.</li>
                <li>👉 Your current score and power will be shown up here on the panel.</li>
                <li>👉 You will need to type your word in below given space and then press SUBMIT button.</li>
                <li>👉 After gameover you will see your final score and power gain.</li>
                <li>👉 You can see your position in leaderboard as well.</li>
            </ul>
        </div>
    </>
  )
}

export default Home
    
