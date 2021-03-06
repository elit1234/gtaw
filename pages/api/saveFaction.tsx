import { NextApiRequest, NextApiResponse } from "next";
import { SQLUpdate } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result: any;

  const { values }: any = req.body;

  const updateData = async (): Promise<any> => {
    const str = `UPDATE factions SET name = ?, type = ? WHERE id = ?`;

    const factionQuery = await SQLUpdate(str, [
      values.name,
      values.type,
      values.id,
    ]);
    return factionQuery;
  };

  result = await updateData();

  res.status(200).json(result);
}
