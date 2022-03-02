import { NextApiRequest, NextApiResponse } from "next";
import { SQLiteQuery } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let faction: FactionType = {};

  const { id }: any = req.body;

  const loadData = async (): Promise<any> => {
    const str = `SELECT * FROM users WHERE faction=${Number(id)}`;
    console.log(str);
    const factionQuery = await SQLiteQuery(str);
    return factionQuery;
  };

  faction = await loadData();

  res.status(200).json(faction);
}
