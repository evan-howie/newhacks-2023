import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./MiddlewareFactory";
import jwt from "jsonwebtoken";

export const checkAuth: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const token = req.headers.get("syllabus-auth");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, "your-secret-key");
      req;
    } catch (e) {}
  };
};
