import { prisma } from "@/db";
import bcrypt from "bcrypt";

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

export async function registerUser({
  name,
  email,
  password,
}: InitialStateProps) {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    return await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error("Error registering user");
  }
}
