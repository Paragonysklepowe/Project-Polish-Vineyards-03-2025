export async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('VineyardExplorerDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('vineyards')) {
        db.createObjectStore('vineyards', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function saveVineyardData(db, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('vineyards', 'readwrite');
    const store = transaction.objectStore('vineyards');

    data.forEach((item) => {
      store.put(item);
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
}
