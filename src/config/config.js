import dotenv from 'dotenv'
dotenv.config();
// console.log(process.env)
const envSecret = process.env.JWT_SECRET;
if (!envSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required in production");
  }
  console.warn("JWT_SECRET not set; using insecure dev default");
}

export const JWT_SECRET = envSecret || "dev-secret";

