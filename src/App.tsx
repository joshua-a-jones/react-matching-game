import { useState } from 'react';
import './App.css';
import { SingleCard } from './components/singleCard';


const cardImages = [
  {src: '/img/card-1.png'},
  {src: '/img/card-2.png'},
  {src: '/img/card-3.png'},
  {src: '/img/card-4.png'},
  {src: '/img/card-5.png'},
  {src: '/img/card-6.png'}
]

export interface Card {
  src: string;
  id: number;
}

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [];
    // for each of the six cards, duplicate it and add random ID's, then push to shuffledDeck
    for (let i = 0; i < cardImages.length; i++) {
      let randId = Math.floor(Math.random()*10000);
      shuffledCards.push(
        {...cardImages[i],
          id:randId}
      );
      randId = Math.floor(Math.random()*10000);
      shuffledCards.push(
        {...cardImages[i],
          id:randId}
      );
    };

    setCards(shuffledCards.sort((a, b) => a.id - b.id));
    setTurns(0);
  };


  return (
    <div className="App">
      <h1>Treasure Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid" >
        {cards.map(card => <SingleCard card={card} />)}
      </div>
    </div>
  );
}

export default App;
