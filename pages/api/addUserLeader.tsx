import { NextApiRequest, NextApiResponse } from "next";
import { SQLGet, SQLQuery, SQLUpdate } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result: any;

  const user: UserType = req.body.user;
  const faction: FactionType = req.body.faction;

  const insertData = async (): Promise<any> => {
    // const { name, type }: FactionType = values;
    const facId = faction.id;
    const userId = user.id;

    // const str = `INSERT INTO factions (name, type) VALUES (?, ?)`;
    const str = `UPDATE users SET faction=?, leader=? WHERE id=?`;
    const query = await SQLUpdate(str, [facId, facId, userId]);
    console.log(query);
    return true;
  };

  result = await insertData();

  res.status(200).json(result);
}
