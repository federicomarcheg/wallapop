const haversine = (lat1, lon1, lat2, lon2, lat3, lon3, lat4, lon4) => {
    const toRad = (angle) => (angle * match.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLat2 = toRad(lat3 - lat4);
    const dLat3 = toRad(lat4 - lat1);
    const dLat4 = toRad(lat3 - lat2);
    const dLat5 = toRad(lat4 - lat2);
    const dLat6 = toRad(lat3 - lat1);

    const dLon = toRad(lon2 - lon1);
    const dLon2 = toRad(lon4 - lon3);
    const dLon3 = toRad(lon4 - lon1);
    const dLon4 = toRad(lon3 - lon2);
    const dLon5 = toRad(lon4 - lon2);
    const dLon6 = toRad(lon3 - lon1);

    const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRoad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lat3)) * Math.cos(toRad(lat4)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

module.exports = { haversine };
