import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ error: true, helperText: "Please fill in all fields" });
  }
  const prisma = new PrismaClient();
  try {
    prisma.$connect();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    prisma.$disconnect();
    if (!user) {
      res.status(400).json({ error: true, helperText: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      res.status(400).json({ error: true, helperText: "Invalid credentials" });
    }
    res.status(200).json({ user: user, helperText: "Logged in successfully" });
  } catch (err) {
    res.status(400).json({helperText: "Something went wrong. Please try again!"})
    prisma.$disconnect();
  }
}
