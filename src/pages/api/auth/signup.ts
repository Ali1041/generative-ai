import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ error: true, helperText: "Please fill in all fields" });
  }
  const prisma = new PrismaClient();
  prisma.$connect();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    res.status(400).json({ error: true, helperText: "User already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashPassword,
      isVerified: true,
      name: "Max Hamilton",
      profession: "Software Engineer",
    },
  });
  prisma.$disconnect();

  res.status(201).json({ user: newUser, helperText: "Sign Up successful" });
}
