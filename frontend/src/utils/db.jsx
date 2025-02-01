import { openDB } from 'idb';

export const initDB = async () => {
    return openDB('adsDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('ads')) {
                db.createObjectStore('ads', { keyPath: 'id' });
            }
        },
    });
};

export const saveAd = async (ad) => {
    const db = await initDB();
    await db.put('ads', ad);
};

export const getSavedAds = async () => {
    const db = await initDB();
    return await db.getAll('ads');
};