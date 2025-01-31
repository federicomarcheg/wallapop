import { useState } from 'react';


const ReviewSection = ({ targetId, userId }) => {
    const [ text, setText] = useState('');


    const submitReview = async () => {
        await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetId, userId, text }),
        });
        alert('Reseña envada');
        setText('');
    };


    return (
        <div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe una reseña"></textarea>
          <button onClick={submitReview}>Enviar</button>
        </div>
      );
};

export default ReviewSection;