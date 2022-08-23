import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATEdb already exists');
        return;
      }
      db.createObjectStore('jate', {
        keyPath: 'id',
        autoIncrement: true,
      });
      console.log('JATEdb created');
    },
  });

export const putDb = async (content) => {
  console.log('put data into JATEdb');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the JATEdb', result);
};

export const getAllDb = async () => {
  console.log('get data from JATEdb');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('data received from JATEdb', result);

  // checks for and returns stored notes, if they exist
  if (result[0]) {
    return result[0].value;
  }
};

initdb();
