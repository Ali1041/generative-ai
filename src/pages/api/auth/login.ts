import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {jwt} from "jsonwebtoken"
import bcrypt from "bcryptjs"


export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {email, password} = req.body;

    if (!email || !password) {
      res.status(400).json({error: true, helperText: "Please fill in all fields"})
    }
  const prisma = new PrismaClient();
  prisma.$connect()
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })
  prisma.$disconnect()
  console.log(user, !user)
  if (!user) {
    res.status(400).json({error: true, helperText: "User does not exist"})
  }

  const isMatch = await bcrypt.compare(password, user?.password)
  if (!isMatch) {
    res.status(400).json({error: true, helperText: "Invalid credentials"})
  }

  const payload = jwt.sign({id: user?.id}, "process.env.JWT_SECRET", {expiresIn: 36000})
  res.status(200).json({token: payload, helperText: "Logged in successfully"})
}
