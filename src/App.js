
import {  useState } from 'react';
import './App.css';
import Question from "./QuestionsComp"

function NameInput(props) {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('name', name);
    props.onNameSubmit();
    
  }

  return (
    <form className='details' onSubmit={handleFormSubmit}>
      <label>
        Enter  your Name  
        </label>
         <input type="text" value={name} onChange={handleNameChange} />
      
      <button type="submit">Start Quiz</button>
    </form>
  );
}

function WelcomeMessage(props) {
  return (
    <div className='Quespage'>
      <h1>Welcome, {props.name}!</h1>
      <Question name={props.name}/>
    </div>
  );
}

function App() {
  const [nameSubmitted, setNameSubmitted] = useState(localStorage.getItem('name') !== null);

  const handleNameSubmit = () => {
    setNameSubmitted(true);
  }

  return (
    <div className='HomePage'>
    
      {nameSubmitted ? <><WelcomeMessage name={localStorage.getItem('name')} /> <button onClick={()=>{setNameSubmitted(0)}}>Home</button> </>: <NameInput onNameSubmit={handleNameSubmit} />}
  
    </div>
  );
}

export default App;



