import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  try {
    console.log('GET all from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.put({id: id, jate: content});
    const result = await request;
    console.log('data aved to jate db', result);
    return result;
  } catch (error) {
    console.error('putDb not implemented')
  }

};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  try {
    console.log('GET all from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('getDb not implemented')
  }

};
initdb();
