import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db.db");

export const SQLGet = async (query: string) => {
  return new Promise(function (resolve, reject) {
    db.all(query, function (err, rows) {
      if (err) return reject(err);
      else resolve(rows);
    });
  });
};

export const SQLUpdate = async (query: string, values?: any[]) => {
  return new Promise(function (resolve, reject) {
    db.run(query, values, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
    // db.run(query, values, function (err: any, rows: any) {
    //   if (err) return reject(err);
    //   else {
    //     resolve(rows);
    //   }
    // });
  });
};

export default db;
