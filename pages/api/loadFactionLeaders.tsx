import { NextApiRequest, NextApiResponse } from "next";
import { SQLGet } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let faction: FactionType = {};

  const { id }: any = req.body;

  const loadData = async (): Promise<any> => {
    console.log("loading faction leaders for fac id: " + id);
    const str = `SELECT * FROM users WHERE faction=? AND leader=?`;
    const factionQuery = await SQLGet(str, [id, id]);
    console.log(factionQuery);
    return factionQuery;
  };

  faction = await loadData();

  res.status(200).json(faction);
}
