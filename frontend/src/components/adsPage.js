import React, { useEffect, useState } from "react";
import { getAds } from "../services/api";

const AdsPage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getAds();
        setAds(data);
      } catch (error) {
        console.error("Error al obtener los anuncios:", error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div>
      <h1>Anuncios</h1>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>{ad.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdsPage;
