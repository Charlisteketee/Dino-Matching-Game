import React, { useState } from "react";
import Card from "./Card";

const Game = () => {
  const [points, setPoints] = useState(0);
  const [cards, setCards] = useState([
    { id: 1, species: 'T-Rex', flipped: false, matched: false },
    { id: 2, species: 'T-Rex', flipped: false, matched: false },
    { id: 3, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 4, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 5, species: 'Brontosaurus', flipped: false, matched: false },
    { id: 6, species: 'Brontosaurus', flipped: false, matched: false },
    { id: 7, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 8, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 9, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 10, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 11, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 12, species: 'Brachiosaurus', flipped: false, matched: false },

  ])
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isChecking, setIsChecking] = useState(null);

  const handleCardClick = (index) => {
    if (isChecking || cards[index].flipped || cards[index].matched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (firstCard === null) {
      setFirstCard(index);
    } else {
      setSecondCard(index);
      setIsChecking(true);

      if (cards[firstCard].species === cards[index].species) {
        const matchedCards = [...cards];
        matchedCards[firstCard].matched = true;
        matchedCards[index].matched = true;
        setCards(matchedCards);
        setPoints(points + 1);
        resetCards();
      } else {
        setTimeout(() => {
          const resetCardState = [...cards];
          resetCardState[firstCard].flipped = false;
          resetCardState[index].flipped = false;
          setCards(resetCardState);
          resetCards();
        }, 5000); // 5 seconds delay
      }
    }
  };

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setIsChecking(false);
  };

  return (
    <div className="game-container">
      <div className="points">Points: {points}</div>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;