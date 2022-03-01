import sqlite3 from "sqlite3";
import path from "path";

sqlite3.verbose();

let db: sqlite3.Database;

// db = new sqlite3.Database(":memory:");

export const OpenDatabase = () =>
  (db = new sqlite3.Database(
    path.resolve(__dirname, "db.db"),
    sqlite3.OPEN_READWRITE
  ));

console.log(path.resolve(__dirname));

export const CloseDatabase = () => db.close();

export const SQLiteQuery = async (query: string) =>
  new Promise((resolve, reject) => {
    OpenDatabase();
    db.all(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
    CloseDatabase();
  });
