import bcrypt from "bcryptjs";

export function isEmailValid(email: string): boolean {
  // Regular expression for validating an Email
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function isPasswordValid(password: string): boolean {
  // NOTE: see my password validation functions here: /Users/mohammedkhan/Documents/NityxPlay/Webpack_React_Learn/250227_NextJS_Setup/nextjs-app/src/app/250315-persona-interview/play0-simple-persona/exp5-password-validation.tsx

  // Placeholder for password validation
  return password.length >= 6;
}

export async function isPasswordCorrect(
  enteredPassword: string,
  actualPassword: any = null
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, actualPassword || "");
}
