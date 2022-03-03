import { NextApiRequest, NextApiResponse } from "next";
import db, { SQLGet } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let faction: FactionType = {};

  const { id }: any = req.body;

  /*

    const loadData = async (): Promise<FactionType[]> => {
    let factions: any = [];
    const str = `SELECT * FROM factions`;

    factions = await SQLGet(str);
    return factions;
  };

  */
  const loadData = async (): Promise<any> => {
    const str = `SELECT id, name, type FROM factions WHERE id=${id}`;
    const factions = await SQLGet(str);
    return factions;
  };

  faction = await loadData();

  res.status(200).json(faction);
}
