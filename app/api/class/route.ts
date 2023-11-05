import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import db from "@/utils/db";
import subprocess from "child_process";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const allowedTypes = ["application/pdf"];

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  let data;
  try {
    data = await req.formData();
  } catch {
    return NextResponse.json({}, { status: 400 });
  }

  const file = data.get("file");
  const name = data.get("name");
  const desc = data.get("desc");

  if (!name || !desc)
    return NextResponse.json({ error: "Bad Form Data" }, { status: 400 });

  if (!file || typeof file === "string")
    return NextResponse.json({ error: "Bad file" }, { status: 400 });

  if (!allowedTypes.includes(file.type))
    return NextResponse.json({ error: "Bad file type" }, { status: 400 });

  if (
    !(await fs
      .access("./syllabus")
      .then(() => true)
      .catch(() => false))
  )
    await fs.mkdir("./syllabus");

  const filePath = "./syllabus/" + uuidv4() + path.extname(file.name);
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  if (
    !(await fs
      .access("./content")
      .then(() => true)
      .catch(() => false))
  )
    await fs.mkdir("./content");

  const outputPath = "./content/" + uuidv4() + ".txt";
  const child = subprocess.spawn("python3", [
    "./scripts/parse.py",
    filePath,
    outputPath,
  ]);

  child.stderr.pipe(process.stderr);

  const exitCode = await new Promise<number | null>((res) =>
    child.on("exit", (code) => res(code))
  );
  if (exitCode !== 0) return NextResponse.json({}, { status: 500 });

  const created = await db.classDetails.create({
    data: {
      name,
      content: outputPath,
      user: {
        connect: {
          email: session.user.email,
        },
      },
      description: desc,
      syllabusPath: filePath,
    },
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
};

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json({ error: "bad session" }, { status: 400 });

  const classes = await db.classDetails.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
  });

  if (classes === null)
    return NextResponse.json({ error: "oops" }, { status: 400 });

  return NextResponse.json(classes);
};
