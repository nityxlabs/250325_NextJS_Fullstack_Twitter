import bcrypt from "bcryptjs";

export async function hashString(
  s: string,
  saltLength: number = 10
): Promise<string> {
  const salt = await bcrypt.genSalt(saltLength);
  const hashedString = await bcrypt.hash(s, salt);
  return hashedString;
}
