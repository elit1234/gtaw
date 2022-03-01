import { NextApiRequest, NextApiResponse } from "next";
import { SQLiteQuery } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let faction: FactionType = {};

  const { id }: any = req.body;

  const loadData = async (): Promise<any> => {
    console.log(req.body);
    const str = `SELECT id, name, type FROM factions WHERE id=${Number(id)}`;
    const factionQuery = await SQLiteQuery(str);
    return factionQuery;
  };

  faction = await loadData();

  res.status(200).json(faction);
}
