import { useState } from 'react';

const RatingSystem = ({ productId }) => {
    const [rating, setRating] = useState(0);

    const submitRating = async () => {
        await fetch('/api/ratings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ productId, userId, score: rating }),
        });
        alert('Calificación enviada');
    };

    return (
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={rating >= star ? 'selected' : ''}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
          <button onClick={submitRating}>Enviar Calificación</button>
        </div>
      );
};

export default RatingSystem;