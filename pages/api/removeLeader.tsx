import { NextApiRequest, NextApiResponse } from "next";
import { SQLUpdate } from "../../src/sqdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result: any;

  const { id }: any = req.body;

  const updateData = async (): Promise<any> => {
    const str = `UPDATE users SET leader=0 WHERE id=?`;
    const factionQuery = await SQLUpdate(str, [id]);
    return factionQuery;
  };

  result = await updateData();

  res.status(200).json(result);
}
