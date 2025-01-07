import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Estado para la información del usuario
  const [ads, setAds] = useState([]); // Estado para los anuncios del usuario

  useEffect(() => {
    // Simular la obtención de datos del usuario y sus anuncios
    const fetchUserData = async () => {
      try {
        // Aquí puedes realizar solicitudes reales a tu backend
        const userData = await fetch("/api/user/profile").then((res) => res.json());
        const userAds = await fetch("/api/user/ads").then((res) => res.json());

        setUser(userData);
        setAds(userAds);
      } catch (error) {
        console.error("Error al cargar los datos del perfil:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Perfil de {user.name}</h1>
        <p>Email: {user.email}</p>
      </div>

      <div className="profile-details">
        <h2>Tus Anuncios</h2>
        {ads.length > 0 ? (
          <ul className="ad-list">
            {ads.map((ad) => (
              <li key={ad.id} className="ad-item">
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <span>Precio: ${ad.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes anuncios publicados.</p>
        )}
      </div>

      <div className="profile-actions">
        <button className="btn-edit-profile">Editar Perfil</button>
        <button className="btn-logout">Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default ProfilePage;
