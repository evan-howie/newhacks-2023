import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { fsync } from "fs";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const classDetail = await db.classDetails.findUnique({
    where: {
      id: params.id,
    },
  });

  const content = readFileSync(classDetail.content, {
    encoding: "utf8",
    flag: "r",
  });

  if (classDetail === null) {
    return NextResponse.json({ error: "No matching id" }, { status: 401 });
  }
  return NextResponse.json({ ...classDetail, content }, { status: 200 });
};
