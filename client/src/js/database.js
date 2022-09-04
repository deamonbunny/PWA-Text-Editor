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

export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const text = jateDb.transaction('jate', 'readwrite');
  const save = text.objectStore('jate');
  const request = save.put({ id: 1, value: content})
  const result = await request;
  console.log(`${result}`)
}


export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const text = jateDb.transaction('jate', 'readonly');
  const save = text.objectStore('jate');
  const request = save.getAll(1);
  const result = await request;
  console.log(`${result}`)
}

initdb();
