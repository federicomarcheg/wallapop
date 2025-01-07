import React from "react";
import PropTypes from "prop-types"; 
import "./AdCard.css"; 

const AdCard = ({ ad, onViewDetails, onAddToFavorites }) => {
  return (
    <div className="ad-card">
      <div className="ad-card-header">
        <h3 className="ad-card-title">{ad.title}</h3>
        <p className="ad-card-price">${ad.price.toFixed(2)}</p>
      </div>
      <p className="ad-card-description">{ad.description}</p>
      <div className="ad-card-actions">
        <button className="btn-details" onClick={() => onViewDetails(ad.id)}>
          Ver detalles
        </button>
        <button className="btn-favorites" onClick={() => onAddToFavorites(ad.id)}>
          Agregar a favoritos
        </button>
      </div>
    </div>
  );
};

// Validación de props
AdCard.propTypes = {
  ad: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};

export default AdCard;
