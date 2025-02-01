import { useEffect, useState } from 'react';
import { getAdHistory } from '../utils/history';

const  adHistory = () => {
    const [history, setHistory] = useState([]);


    useEffect(() => {
        setHistory(getAdHistory());
    }, []);

    return (
        <div>
          <h3>Historial de Anuncios Vistos</h3>
          <ul>
            {history.map(ad => (
              <li key={ad.id}>
                <a href={`/ad/${ad.id}`}>{ad.title}</a>
              </li>
            ))}
          </ul>
        </div>
      );
};



export default AdHistory;