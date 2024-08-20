
import { useState } from "react";
export function CorrectGuess({ correctGuesses }) {

    const [isOpen, setIsOpen] = useState(false);
    const openGuesses = () => {
        setIsOpen(true);
    }
    const closeGuesses = () => {
        setIsOpen(false);
    }


    return (
        <section className="correctGuesses">

            {isOpen ? <ul>
                {
                    correctGuesses.map((correctGuess) => {
                        return <li key={correctGuess}> {correctGuess}</li>
                    })

                }

            </ul>

                :
                <p>{correctGuesses.length} words found</p>

            }

            {
                isOpen ? <a className="openclose" href='#' onClick={closeGuesses}>Close</a>
                    : correctGuesses.length > 0 ? <a className="openClose" href="#" onClick={openGuesses}> Open</a> : null
            }

        </section>


    );



}