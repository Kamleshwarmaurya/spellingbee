export function Score({correctGuesses}) {

    let score = 0;
    correctGuesses.map((correctGuss)=> {
            if(correctGuss.length === 4) {
                score++;
            } else {
                score = score + correctGuss.length;
            }

    });

    return (
        <p className="score">Score: {score}</p>

    );



}