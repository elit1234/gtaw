import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db.db");

export const SQLGet = async (query: string, values?: any) => {
  if (!values)
    return new Promise(function (resolve, reject) {
      db.all(query, function (err, rows) {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  else {
    return new Promise(function (resolve, reject) {
      db.all(query, values, function (err, row) {
        if (err) return reject(err);
        else resolve(row);
      });
    });
  }
};

export const SQLUpdate = async (query: string, values?: any[]) => {
  console.log("SQLUpdate query: " + query);
  console.log("SQLUpdate values: " + JSON.stringify(values));
  return new Promise(function (resolve, reject) {
    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
};

export const SQLQuery = async (query: string, values: any[]) => {
  return new Promise(function (resolve, reject) {
    const stmt = db.prepare(query);
    stmt.run(query, values);
    console.log(stmt);
  });
};

export default db;
