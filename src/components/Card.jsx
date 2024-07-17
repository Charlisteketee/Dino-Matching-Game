import React from "react";
import '../styles/Card.css';

const Card = ({ card, index, handleCardClick }) => {
  return (
    <div
      className={`card ${card.flipped ? 'flipped' : ''}`}
      onClick={() => handleCardClick(index)}
    >
      {card.flipped || card.matched ? (
        <img src={`/images/${card.species}.jpg`} alt={card.species} />
      ) : null}
    </div>
  );
};

export default Card;
