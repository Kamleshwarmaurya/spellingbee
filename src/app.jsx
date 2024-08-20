
import { useEffect, useState } from "react";


import './app.css'
import { Header } from "./components/Header";
import { Honeycomb } from "./components/Honeycomb";
import { Guess } from "./components/Guess";
import { CorrectGuess } from "./components/CorrectGuess";
import { Score } from "./components/Score";
import { Notification } from "./components/Notification";
export function App() {

  const [data, setData] = useState();
  const [guess, setGuess] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const addLetter = (letter) => {
    setGuess((guessedLetter) => guessedLetter + letter);
    if(message.length !== 0) { setMessage('')}
  };

  const removeLetter = () => {
    setGuess(guess.slice(0, -1));
  };

  const checkGuess = () => {
    setGuess('');
    if (correctGuesses.includes(guess)) {
      setMessage("Already Exists");
      setType('error');
    } else if (data.answers && data.answers.includes(guess)) {
      addCorrectGuess();
      setMessage("Good Job");
      setType('success');
    } else {
      setMessage("Nice try.");
      setType('error');
    }
  }


  const addCorrectGuess = () => {
    setCorrectGuesses([...correctGuesses, guess])
  };

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('/api/data.json',
        { headers: { "Content-Type": "application/json" } })

      const json = await result.json();
      setData(json.data.today);
    }

    fetchData();

  }, []);

  return (
    <>
      {
        data ?
          <>
            <Header date={data.displayDate} editor={data.editor}></Header>
            <Score correctGuesses={correctGuesses}></Score>
            <CorrectGuess correctGuesses={correctGuesses}></CorrectGuess>
            <Notification message={message} type={type}></Notification>
            <section className="container">
              <div className="inputs">
                <div className="center">
                  <Guess guess={guess} centerLetter={data.centerLetter}></Guess>
                  <Honeycomb centerLetter={data.centerLetter}
                    outerLetters={data.outerLetters}
                    validLetters={data.validLetters}
                    addLetter={addLetter}
                    removeLetter={removeLetter}
                    checkGuess={checkGuess}

                  ></Honeycomb>
                </div>
              </div>
            </section>
          </>
          : <p>.. Loading </p>
      }

    </>
  )
}

