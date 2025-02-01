export const saveAddTohistory = (ad) => {
    let history = JSON.parse(localStorage.getItem('adHistory')) || [];


    if (!history.find(item => item.id === ad.id)) {
        history.unshift(ad);
        if (history.length > 10) history.pop();
        localStorage.setItem('adHistory', JSON.stringify(history));
    }
};

export const getAdHistory = () => {
    return JSON.parse(localStorage.getItem('adHistory')) || [];
};