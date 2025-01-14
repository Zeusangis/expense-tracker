"use server";

import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secret);

export async function encrypt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(token: string): Promise<Record<string, unknown>> {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
