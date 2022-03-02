import { NextApiRequest, NextApiResponse } from "next";
import { SQLGet } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let factions: any = [];

  const loadData = async (): Promise<FactionType[]> => {
    let factions: any = [];
    const str = `SELECT * FROM factions`;

    factions = await SQLGet(str);
    return factions;
  };

  factions = await loadData();

  res.status(200).json(factions);
}
