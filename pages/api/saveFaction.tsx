import { NextApiRequest, NextApiResponse } from "next";
import { SQLiteQuery } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result: any;

  const { values }: any = req.body;

  const updateData = async (): Promise<any> => {
    console.log(req.body);
    const str = `UPDATE factions SET name = '${values.name}', type = '${values.type}' WHERE id = ${values.id}`;
    console.log(str);
    const factionQuery = await SQLiteQuery(str);
    return factionQuery;
  };

  result = await updateData();

  res.status(200).json(result);
}
