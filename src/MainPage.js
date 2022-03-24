import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactHowler from 'react-howler';

function MainPage() {

    const [currword, setCurrword] = useState();
    const [newword, setNewword] = useState([]);
    const [item, setItem] = useState();
    const [wrongWord, setWrongWord] = useState([]);

    const [sud, setSud] = useState();
    
    const [counter, setCounter] = useState(0);
    const [liveScore, setLiveScore] = useState(0);
    const [livePower, setLivePower] = useState(0);
    

    useEffect(()=>{
        async function getData(){
            const res = await axios.get(`https://random-word-api.herokuapp.com/word?number=1000`);
            setNewword([...res.data]);
        }
        getData();

    },[sud])

    

    useEffect(()=>{  
         
        setItem(newword[counter]);
    },[newword, counter])

    

    const compare = () => {

        var freshWord = item;
        if(freshWord === currword){
            setLiveScore(liveScore + freshWord.length);
            setLivePower(String((liveScore + freshWord.length)/25).split('.')[0]);
            positiveSound.play();
        }
        else{
            wrongWord.push(currword);
            negativeSound.play();
        }
        setCounter(counter+1);
    }

    const navigate = useNavigate();

    const toGameover=()=>{
        navigate('/gameover',{state:{finalScore: liveScore, finalPower: livePower}});
        sendData();
        gameoverSound.play();
    }

    const location = useLocation();
    

    const sendData = () =>{
        fetch("https://django-auth.azurewebsites.net/sendscore", {
        method: "POST",
        body: JSON.stringify({
            name: location.state.name,
            score: liveScore,
            power: livePower
        }),
        headers: {
            "Content-type": "application/json",
        }
        })
        .then((response) => {
            return response.json();
        })

        // Displaying results to console
        .then((json) => {
            console.log(json);
        })
        
        .catch((error) => console.log(error));
    }

    const { Howl } = require('howler');

    const positiveSound = new Howl({
        src: ['PositiveSound.mp3']
    });

    const negativeSound = new Howl({
        src: ['NegativeSound.mp3']
    });

    const gameoverSound = new Howl({
        src: ['gameoverSound.mp3']
    });
    
  return (
    <>  
        <div className="container">
            <div className="header">
                <div className="homeLogo">
                    <Link to='/'>🏠</Link>
                </div>
                <div className="commingWord">
                    <p>Word is</p>
                    <h1 id='typeword'>{item}</h1>
                </div>
                <div className="leaderboardLogo">
                    <Link to='/leaderboard'>🏆</Link>
                </div>
            </div>
            
            <p id="stackText">Incorrect words that you typed</p>
            <div className="stack">
                
                    <div className="box">
                        <Scrollbars id='scrollbar' style={{ width: 900, height: 100 }}>
                            <ul>
                            {wrongWord.length>0 && 
                                wrongWord.map((i, index)=>(
                                index<9 ? <li>{i}</li> : toGameover()
                            ))}    
                            </ul>
                        </Scrollbars>
                    </div>
                
            </div>
            
            <div className="points">
                <div className="score">
                    <div>SCORE :</div>
                    <div className="currScore">{liveScore}</div>
                </div>
                <div className="power">
                    <div>POWER :</div> 
                    <div className="currPower">{livePower}X</div>
                </div>
            </div>
            
            <div className="word">
                <p>Type your word</p>
                <input type="text" onChange={(e) =>{setCurrword(e.target.value);}} className="form__field" placeholder='Enter here ...' name="word" id='word' required /><br/>
                <input id='inputBtn' type='button' value='submit' onClick={compare} />
            </div>
        </div>
    </>
  )
}

export default MainPage
    
