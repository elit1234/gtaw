import { NextApiRequest, NextApiResponse } from "next";
import { SQLiteQuery } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let factions: any = [];

  const { id }: any = req.body;

  const loadData = async (): Promise<any> => {
    console.log(req.body);
    const str = `SELECT id, name, type FROM factions`;
    const factionQuery = await SQLiteQuery(str);
    return factionQuery;
  };

  factions = await loadData();

  res.status(200).json(factions);
}
