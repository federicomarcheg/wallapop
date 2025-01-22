import { useState } from 'react';

const OfferSystem = ({ productId }) => {
    const [amount, setAmount] = useState('');


    const submitOffer = async () => {
        const response = await fetch('/api/products/offer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, buyerId: '12345', amount }),
        });

        if (response.ok) {
            alert('Oferta realizada con éxito');
        }
    };


    return (
        <div>
            <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Cantidad de oferta">
            </input>
            <button onClick={submitOffer}>Hacer oferta</button>
        </div>
    );
};

export default OfferSystem;