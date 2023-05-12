import { openDB } from 'idb';

const initdb = async () =>
  openDB('tch-editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('te')) {
        console.log('database already exists');
        return;
      }
      db.createObjectStore('te', { keyPath: 'id', autoIncrement: true });
      console.log('tch editor database created');
    },
  });

export const putDb = async (content) => {
  const db = await openDB("tch-editor", 1);
  const tx = db.transaction("te", "readwrite");
  const store = tx.objectStore("te");
  const result = await store.put({ id: 1, value: content });
  console.log("🚀 - data saved to the database", result);
}

export const getDb = async () => {
  const db = await openDB("tch-editor", 1);
  const tx = db.transaction("te", "readonly");
  const store = tx.objectStore("te");
  const request = store.get(1);
  const result = await request;
  if (result) {
    console.log("result.content", result.value);
    return result.value;
  }
  return null;
}

initdb();
