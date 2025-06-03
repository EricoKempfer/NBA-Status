import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await client.execute(
      "SELECT * FROM common_player_info LIMIT 1"
    );
    console.log("Dados recebidos API:", result.rows);
    console.log("RESULTADO:", result);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar dados" });
  }
}