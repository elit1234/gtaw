import { NextApiRequest, NextApiResponse } from "next";
import { SQLUpdate } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result: any;

  const { values, id }: any = req.body;

  const updateData = async (): Promise<any> => {
    const { deptAbility, radioAbility, arrestAbility } = values;
    const str = `UPDATE factions SET deptAbility = ?, radioAbility = ?, arrestAbility = ?WHERE id = ?`;

    const factionQuery = await SQLUpdate(str, [
      deptAbility,
      radioAbility,
      arrestAbility,
      id,
    ]);
    return factionQuery;
  };

  result = await updateData();

  res.status(200).json(result);
}
