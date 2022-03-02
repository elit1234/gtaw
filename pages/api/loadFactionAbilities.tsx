import { NextApiRequest, NextApiResponse } from "next";
import { SQLGet } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let faction: FactionType = {};

  const { id }: any = req.body;

  const loadData = async (): Promise<any> => {
    const str = `SELECT deptAbility, radioAbility, arrestAbility FROM factions WHERE id=${Number(
      id
    )}`;
    const factionQuery = await SQLGet(str);
    return factionQuery;
  };

  faction = await loadData();

  res.status(200).json(faction);
}
