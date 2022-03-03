import { NextApiRequest, NextApiResponse } from "next";
import db, { SQLGet } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result: any;

  const { string }: any = req.body;

  const searchForUser = async (): Promise<any> => {
    const isNumber = !isNaN(string);
    let str: string = "";
    if (isNumber) {
      const str = `SELECT * from users WHERE id=${string}`;
      const userQuery = await SQLGet(str);
      return userQuery;
    } else {
    }
  };

  // const searchForUser = async (): Promise<any> => {
  //   const isNumber = !isNaN(string);
  //   console.log("isNumber: " + isNumber);
  //   let str: string = "";
  //   if (isNumber) str = `SELECT * from users WHERE id=${string}`;
  //   else str = `SELECT * from users WHERE username LIKE '%?%'`;
  //   let factionQuery;
  //   if (isNumber) factionQuery = await SQLGet(str);
  //   else factionQuery = await SQLGet(str, string);
  //   return factionQuery;
  // };

  result = await searchForUser();

  res.status(200).json(result);
}
