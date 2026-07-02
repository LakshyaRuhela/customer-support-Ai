import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  //  get token from cookies
  const session = await cookies();
  const token = session.get("access_token")?.value;
  //   console.log(token);
  if (!token) {
    return null;
  }

  try {
    const result: any = await scalekit.validateToken(token);
    const userResponse = await scalekit.user.getUser(result.sub);
    // console.log("userResponse", userResponse);
    return userResponse?.user ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
