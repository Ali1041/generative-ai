import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

type Data = {
  state: string;
  country: string;
  rooms: number;
  baths: number;
  zipcode: number;
  price: Decimal;
  condition: number
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const postData = req.body;
  const prisma = new PrismaClient();
  prisma.$connect()
  const user = await prisma.user.create({
    data: {
        name: 'John Doe',
        email: 'admin@gmail.com'
    }
  })
  postData.owner = user

  const body = await prisma.property.create({
    data: postData
  });
  prisma.$disconnect()
  res.status(201).json(body);
}
