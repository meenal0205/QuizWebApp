
import {useEffect, useState } from 'react';
import './QuestionsComp.css';
import MCQ from './Quesdataset';
let participant = localStorage.getItem("participant");
let participantObj;
if (participant == null) participantObj = [];
else participantObj = JSON.parse(participant);
localStorage.clear()


const generateRandomNumbers = (min,max,times) => {
    const randoms = []
  
    for (let i = 0; i < times; i++) {
        randoms.push(Math.floor(Math.random() * (max - min) + min))
    }
  
    return randoms
  
  
  }

  
export default function Question(props){


    const [QueNum,setquenum]=useState(0);
    const [score,handleScore]=useState(0);
    const [wrong,handleWrong]=useState(0);
    const [skipped,handleSkipped]=useState(0);
 
  
  
    function onAnswerSelected(e){
    
      if(e===MCQ[arr[QueNum]].answer){
        handleScore(score+1);
        
        setquenum(QueNum+1);
        
      }
      else{
        handleWrong(wrong+1);
        setquenum(QueNum+1);
    
      }
    } 

    

  function Timer() {
    const [counter, setCounter] = useState(30);
  
    useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if(counter <= 0 ){
        setquenum(QueNum+1);
        handleSkipped(skipped+1);

      } 
    }, [counter]);
  
    return (
      <div className="timer">
        <div>Timer : {counter}</div>
      </div>
    );
  }

  
    
    let arr = generateRandomNumbers(0,59,25 );
   
    function handleclick(){
      if(QueNum<25){
        setquenum(QueNum+1);
        handleSkipped(skipped+1);
        console.log("lwhtwth");
    
      }
    }
  
    if(QueNum===25){
    let Name=props.name;
    let currentDate = new Date().toJSON().slice(0, 10);
    let currenttime = new Date().toJSON().slice(11,16);
    console.log(currenttime)

      let obj={currentDate,Name,score,wrong,skipped}
      participantObj.push(obj);
      localStorage.setItem("participant", JSON.stringify(participantObj));
      // console.log("OBJ",participantObj);
    }
   
    const container = [];

    function showprevresult(){

      
      for(let i =0;i<participantObj.length;i++){
          if(props.name===participantObj[i].Name){
            container.push(participantObj[i])
          }
      }

      let jsonObject = container.map(JSON.stringify);
              
      
              
      let uniqueSet = new Set(jsonObject);
      let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      console.log(uniqueArray);
        return(
          uniqueArray
        )
    }

    let items=showprevresult();

    function MyComponent({ items }) {
      return (
        <div>
          {items.map(item => (
            <div key={item.id}>
             
              <p>Name: {item.Name}</p>
              <p>Score: {item.score}</p>
              <p>date: {item.currentDate}</p>
              <p>wrong: {item.wrong}</p>
              <p>skipped: {item.skipped}</p>

            </div>
          ))}
        </div>
      );
    }

    
  
    
    return (
      
      <div className='Quesbody'>
      {(QueNum<25)?<>
  <div className='current'>
    <div>Current Score : {score}</div>
    <div>Wrong Ans : {wrong}</div>
    <div>Skipped Questions : {skipped}</div>
  </div>
    <div className='Quenum'  >Question number {QueNum+1}</div>

    <Timer/>

    <p className='question'  >{MCQ[arr[QueNum]].question}</p>
    <div className='options'>
      <button onClick={() => onAnswerSelected(MCQ[arr[QueNum]].options[0])}> {MCQ[arr[QueNum]].options[0]}</button>
      <button onClick={() => onAnswerSelected(MCQ[arr[QueNum]].options[1])} >{MCQ[arr[QueNum]].options[1]}</button>
      <button onClick={() => onAnswerSelected(MCQ[arr[QueNum]].options[2])} > {MCQ[arr[QueNum]].options[2]}</button>
      <button onClick={() => onAnswerSelected(MCQ[arr[QueNum]].options[3])} >{MCQ[arr[QueNum]].options[3]}</button>
    </div>
    <button  onClick={handleclick}>Next</button>
  </>:<>
  <div > 
      
      <MyComponent  items={items} />
    </div>

  </>}
      

      </div>
    )    
  }

