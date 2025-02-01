import { useEffect } from 'react';
import { saveAdToHistory } from '../utils/history';
import { saveAd, getSavedAds } from '../utils/db';




const AdPage = ({ ad }) => {
    useEffect(() => {
        saveAdToHistory(ad);
    }, [ad]);

    return <div>{ad.title}</div>;
};

export default AdPage;

const adPage = ({ ad }) => {
    const [ads, setAds] = useState([]);


    useEffect(() => {
        saveAd(ad);
        getSavedAds().then(setAds);
    }, [ad]);


    return (
        <div>
          <h1>{ad.title}</h1>
          <h3>Anuncios Guardados:</h3>
          <ul>
            {ads.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      );
};

