import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "@/utils/db";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  if (!data?.name || !data?.email || !data?.password) {
    return NextResponse.json(
      { error: "Please provide credentials" },
      { status: 405 }
    );
  }

  const { name, email, password } = data;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
