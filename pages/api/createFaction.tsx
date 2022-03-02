import { NextApiRequest, NextApiResponse } from "next";
import { SQLGet, SQLUpdate } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result: any;

  const { values }: any = req.body;

  const insertData = async (): Promise<any> => {
    const { name, type }: FactionType = values;
    const str = `INSERT INTO factions (name, type) VALUES (?, ?)`;
    const id: any = await SQLUpdate(str, [name, type]);
    return id && id.id && id.id;
  };

  result = await insertData();

  res.status(200).json(result);
}
